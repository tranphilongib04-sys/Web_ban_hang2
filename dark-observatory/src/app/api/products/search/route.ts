import { NextRequest, NextResponse } from 'next/server';
import { searchProducts, getLowInventoryProducts } from '@/lib/db/advancedQueries';

/**
 * @swagger
 * /api/products/search:
 *   get:
 *     tags:
 *       - Products
 *     summary: Search and filter products
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [name, price, quantity]
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Search results with pagination
 *       500:
 *         description: Server error
 */
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const searchTerm = searchParams.get('q') || undefined;
    const category = searchParams.get('category') || undefined;
    const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;
    const sortBy = (searchParams.get('sortBy') || 'name') as 'name' | 'price' | 'quantity' | 'id';
    const sortOrder = (searchParams.get('sortOrder') || 'asc') as 'asc' | 'desc';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    const results = await searchProducts({
      searchTerm,
      category,
      minPrice,
      maxPrice,
      sortBy,
      sortOrder,
      limit,
      offset,
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error('Search products error:', error);
    return NextResponse.json(
      { error: 'Failed to search products' },
      { status: 500 }
    );
  }
}
