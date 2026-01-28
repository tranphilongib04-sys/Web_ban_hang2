import { NextRequest, NextResponse } from 'next/server';
import { getLowInventoryProducts, getInventoryValue } from '@/lib/db/advancedQueries';

/**
 * @swagger
 * /api/products/inventory/low:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get products with low inventory
 *     parameters:
 *       - in: query
 *         name: threshold
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: List of low inventory products
 *       500:
 *         description: Server error
 */
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const threshold = parseInt(searchParams.get('threshold') || '10');

    const products = await getLowInventoryProducts(threshold);
    const inventoryValue = await getInventoryValue();

    return NextResponse.json({
      products,
      inventory: inventoryValue,
    });
  } catch (error) {
    console.error('Get low inventory error:', error);
    return NextResponse.json(
      { error: 'Failed to get low inventory products' },
      { status: 500 }
    );
  }
}
