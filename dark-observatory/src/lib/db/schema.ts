import { sqliteTable, integer, text, real, datetime } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

/**
 * Products Table
 * Stores product information
 */
export const products = sqliteTable('products', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  price: real('price').notNull(),
  quantity: integer('quantity').default(0),
  category: text('category'),
  createdAt: datetime('created_at').defaultNow(),
  updatedAt: datetime('updated_at').defaultNow(),
});

/**
 * Orders Table
 * Stores order information
 */
export const orders = sqliteTable('orders', {
  id: integer('id').primaryKey(),
  customerId: integer('customer_id').notNull(),
  orderDate: datetime('order_date').defaultNow(),
  totalAmount: real('total_amount').notNull(),
  status: text('status').default('pending'), // pending, processing, completed, cancelled
  notes: text('notes'),
  createdAt: datetime('created_at').defaultNow(),
});

/**
 * Customers Table
 * Stores customer information
 */
export const customers = sqliteTable('customers', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').unique(),
  phone: text('phone'),
  address: text('address'),
  city: text('city'),
  country: text('country'),
  createdAt: datetime('created_at').defaultNow(),
  updatedAt: datetime('updated_at').defaultNow(),
});

/**
 * Order Items Table
 * Stores items in each order
 */
export const orderItems = sqliteTable('order_items', {
  id: integer('id').primaryKey(),
  orderId: integer('order_id').notNull(),
  productId: integer('product_id').notNull(),
  quantity: integer('quantity').notNull(),
  unitPrice: real('unit_price').notNull(),
  subtotal: real('subtotal').notNull(),
});

// ============= RELATIONS =============

export const productsRelations = relations(products, ({ many }) => ({
  orderItems: many(orderItems),
}));

export const ordersRelations = relations(orders, ({ many, one }) => ({
  customer: one(customers, {
    fields: [orders.customerId],
    references: [customers.id],
  }),
  items: many(orderItems),
}));

export const customersRelations = relations(customers, ({ many }) => ({
  orders: many(orders),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));

// ============= TYPE DEFINITIONS =============

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;

export type Customer = typeof customers.$inferSelect;
export type NewCustomer = typeof customers.$inferInsert;

export type OrderItem = typeof orderItems.$inferSelect;
export type NewOrderItem = typeof orderItems.$inferInsert;
