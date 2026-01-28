import { NextRequest, NextResponse } from 'next/server';
import { getSalesSummary, getDailySalesReport } from '@/lib/db/advancedQueries';

/**
 * @swagger
 * /api/reports/sales:
 *   get:
 *     tags:
 *       - Reports
 *     summary: Get sales report and statistics
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [summary, daily]
 *           default: summary
 *     responses:
 *       200:
 *         description: Sales report data
 *       500:
 *         description: Server error
 */
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const startDateStr = searchParams.get('startDate');
    const endDateStr = searchParams.get('endDate');
    const type = searchParams.get('type') || 'summary';

    const startDate = startDateStr ? new Date(startDateStr) : undefined;
    const endDate = endDateStr ? new Date(endDateStr) : undefined;

    if (type === 'daily') {
      const daysStr = searchParams.get('days');
      const days = daysStr ? parseInt(daysStr) : 30;
      const dailyReport = await getDailySalesReport(days);
      return NextResponse.json({ report: dailyReport, type: 'daily' });
    }

    const summary = await getSalesSummary(startDate, endDate);
    return NextResponse.json({ report: summary, type: 'summary' });
  } catch (error) {
    console.error('Get sales report error:', error);
    return NextResponse.json(
      { error: 'Failed to get sales report' },
      { status: 500 }
    );
  }
}
