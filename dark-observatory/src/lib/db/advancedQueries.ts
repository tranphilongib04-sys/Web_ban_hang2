/**
 * Advanced database query functions for TPB Manage
 * Includes search, filtering, sorting, and complex relationships
 */

import { db } from './client';
import { products, orders, customers } from './schema';
import { eq, like, and, or, desc, asc, between, sql } from 'drizzle-orm';

// ============= PRODUCT QUERIES =============

/**
 * Search products with advanced filtering
 * @param searchTerm - Search in name, description
 * @param category - Filter by category
 * @param minPrice - Minimum price filter
 * @param maxPrice - Maximum price filter
 * @param sortBy - Sort field (name, price, quantity)
 * @param sortOrder - asc or desc
 * @param limit - Items per page
 * @param offset - Pagination offset
 */
export async function searchProducts({
  searchTerm,
  category,
  minPrice,
  maxPrice,
  sortBy = 'name',
  sortOrder = 'asc',
  limit = 10,
  offset = 0,
}: {
  searchTerm?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'name' | 'price' | 'quantity' | 'id';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}) {
  const conditions = [];

  // Add search condition
  if (searchTerm) {
    conditions.push(
      or(
        like(products.name, `%${searchTerm}%`),
        like(products.description, `%${searchTerm}%`)
      )
    );
  }

  // Add category filter
  if (category) {
    conditions.push(eq(products.category, category));
  }

  // Add price range filter
  if (minPrice !== undefined && maxPrice !== undefined) {
    conditions.push(between(products.price, minPrice, maxPrice));
  } else if (minPrice !== undefined) {
    conditions.push(sql`${products.price} >= ${minPrice}`);
  } else if (maxPrice !== undefined) {
    conditions.push(sql`${products.price} <= ${maxPrice}`);
  }

  // Build order clause
  const orderField =
    sortBy === 'name'
      ? products.name
      : sortBy === 'price'
      ? products.price
      : sortBy === 'quantity'
      ? products.quantity
      : products.id;

  const orderClause =
    sortOrder === 'asc' ? asc(orderField) : desc(orderField);

  // Execute query
  let query = db.select().from(products);

  if (conditions.length > 0) {
    query = query.where(and(...conditions));
  }

  const results = await query.orderBy(orderClause).limit(limit).offset(offset);

  // Get total count for pagination
  const countQuery = db.select({ count: sql<number>`count(*)` }).from(products);
  if (conditions.length > 0) {
    countQuery.where(and(...conditions));
  }
  const countResult = await countQuery;
  const totalCount = countResult[0]?.count || 0;

  return {
    data: results,
    pagination: {
      total: totalCount,
      page: Math.floor(offset / limit) + 1,
      limit,
      pages: Math.ceil(totalCount / limit),
    },
  };
}

/**
 * Get product with low inventory
 */
export async function getLowInventoryProducts(threshold: number = 10) {
  return db
    .select()
    .from(products)
    .where(sql`${products.quantity} <= ${threshold}`)
    .orderBy(asc(products.quantity));
}

/**
 * Get top selling products (mock implementation)
 */
export async function getTopSellingProducts(limit: number = 10) {
  // This would need order items table to be fully functional
  return db.select().from(products).limit(limit).orderBy(desc(products.price));
}

/**
 * Get products by category with statistics
 */
export async function getProductsByCategory(category: string) {
  const categoryProducts = await db
    .select()
    .from(products)
    .where(eq(products.category, category));

  const stats = {
    totalProducts: categoryProducts.length,
    totalValue: categoryProducts.reduce((sum: number, p) => sum + p.price * p.quantity, 0),
    averagePrice: categoryProducts.reduce((sum: number, p) => sum + p.price, 0) / categoryProducts.length || 0,
    totalQuantity: categoryProducts.reduce((sum: number, p) => sum + p.quantity, 0),
  };

  return { products: categoryProducts, statistics: stats };
}

// ============= ORDER QUERIES =============

/**
 * Search orders with advanced filtering
 */
export async function searchOrders({
  customerId,
  status,
  minAmount,
  maxAmount,
  startDate,
  endDate,
  sortBy = 'id',
  sortOrder = 'desc',
  limit = 10,
  offset = 0,
}: {
  customerId?: number;
  status?: string;
  minAmount?: number;
  maxAmount?: number;
  startDate?: Date;
  endDate?: Date;
  sortBy?: 'id' | 'total' | 'date';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}) {
  const conditions = [];

  if (customerId) conditions.push(eq(orders.customerId, customerId));
  if (status) conditions.push(eq(orders.status, status));
  if (minAmount !== undefined) conditions.push(sql`${orders.totalAmount} >= ${minAmount}`);
  if (maxAmount !== undefined) conditions.push(sql`${orders.totalAmount} <= ${maxAmount}`);
  if (startDate) conditions.push(sql`${orders.orderDate} >= ${startDate}`);
  if (endDate) conditions.push(sql`${orders.orderDate} <= ${endDate}`);

  let query = db.select().from(orders);

  if (conditions.length > 0) {
    query = query.where(and(...conditions));
  }

  const orderField = sortBy === 'total' ? orders.totalAmount : sortBy === 'date' ? orders.orderDate : orders.id;
  const orderClause = sortOrder === 'asc' ? asc(orderField) : desc(orderField);

  const results = await query.orderBy(orderClause).limit(limit).offset(offset);

  const countQuery = db.select({ count: sql<number>`count(*)` }).from(orders);
  if (conditions.length > 0) {
    countQuery.where(and(...conditions));
  }
  const countResult = await countQuery;
  const totalCount = countResult[0]?.count || 0;

  return {
    data: results,
    pagination: {
      total: totalCount,
      page: Math.floor(offset / limit) + 1,
      limit,
      pages: Math.ceil(totalCount / limit),
    },
  };
}

/**
 * Get customer orders
 */
export async function getCustomerOrders(customerId: number) {
  return db.select().from(orders).where(eq(orders.customerId, customerId));
}

/**
 * Get orders by date range
 */
export async function getOrdersByDateRange(startDate: Date, endDate: Date) {
  return db
    .select()
    .from(orders)
    .where(and(
      sql`${orders.orderDate} >= ${startDate}`,
      sql`${orders.orderDate} <= ${endDate}`
    ))
    .orderBy(desc(orders.orderDate));
}

// ============= CUSTOMER QUERIES =============

/**
 * Search customers
 */
export async function searchCustomers({
  searchTerm,
  limit = 10,
  offset = 0,
}: {
  searchTerm?: string;
  limit?: number;
  offset?: number;
}) {
  const conditions = [];

  if (searchTerm) {
    conditions.push(
      or(
        like(customers.name, `%${searchTerm}%`),
        like(customers.email, `%${searchTerm}%`),
        like(customers.phone, `%${searchTerm}%`)
      )
    );
  }

  let query = db.select().from(customers);

  if (conditions.length > 0) {
    query = query.where(and(...conditions));
  }

  const results = await query.limit(limit).offset(offset);

  const countQuery = db.select({ count: sql<number>`count(*)` }).from(customers);
  if (conditions.length > 0) {
    countQuery.where(and(...conditions));
  }
  const countResult = await countQuery;
  const totalCount = countResult[0]?.count || 0;

  return {
    data: results,
    pagination: {
      total: totalCount,
      page: Math.floor(offset / limit) + 1,
      limit,
      pages: Math.ceil(totalCount / limit),
    },
  };
}

/**
 * Get customer with order history
 */
export async function getCustomerWithHistory(customerId: number) {
  const customer = await db.select().from(customers).where(eq(customers.id, customerId));
  const customerOrders = await getCustomerOrders(customerId);

  return {
    customer: customer[0],
    orders: customerOrders,
    totalOrders: customerOrders.length,
    totalSpent: customerOrders.reduce((sum: number, order) => sum + order.totalAmount, 0),
  };
}

// ============= STATISTICS & ANALYTICS =============

/**
 * Get sales summary
 */
export async function getSalesSummary(startDate?: Date, endDate?: Date) {
  const conditions = [];

  if (startDate) conditions.push(sql`${orders.orderDate} >= ${startDate}`);
  if (endDate) conditions.push(sql`${orders.orderDate} <= ${endDate}`);

  let query = db.select({
    totalOrders: sql<number>`COUNT(*)`,
    totalRevenue: sql<number>`SUM(${orders.totalAmount})`,
    averageOrderValue: sql<number>`AVG(${orders.totalAmount})`,
    maxOrder: sql<number>`MAX(${orders.totalAmount})`,
    minOrder: sql<number>`MIN(${orders.totalAmount})`,
  }).from(orders);

  if (conditions.length > 0) {
    query = query.where(and(...conditions));
  }

  const result = await query;

  return result[0] || {
    totalOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    maxOrder: 0,
    minOrder: 0,
  };
}

/**
 * Get inventory value
 */
export async function getInventoryValue() {
  const result = await db
    .select({
      totalItems: sql<number>`SUM(${products.quantity})`,
      totalValue: sql<number>`SUM(${products.price} * ${products.quantity})`,
      productCount: sql<number>`COUNT(*)`,
    })
    .from(products);

  return result[0] || {
    totalItems: 0,
    totalValue: 0,
    productCount: 0,
  };
}

/**
 * Get daily sales report
 */
export async function getDailySalesReport(days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return db
    .select({
      date: sql<string>`DATE(${orders.orderDate})`,
      totalSales: sql<number>`SUM(${orders.totalAmount})`,
      orderCount: sql<number>`COUNT(*)`,
      averageOrder: sql<number>`AVG(${orders.totalAmount})`,
    })
    .from(orders)
    .where(sql`${orders.orderDate} >= ${startDate}`)
    .groupBy(sql`DATE(${orders.orderDate})`)
    .orderBy(desc(sql`DATE(${orders.orderDate})`));
}
