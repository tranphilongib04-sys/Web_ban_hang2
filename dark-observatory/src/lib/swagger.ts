/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome to TPB Manage API
 *     description: Returns a welcome message
 *     responses:
 *       200:
 *         description: Welcome message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Welcome to TPB Manage API"
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products with optional filtering
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search products by name
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create a new product
 *     description: Add a new product to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error

 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     description: Retrieve details of a specific product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update a product
 *     description: Update product details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: Product updated
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete a product
 *     description: Remove a product from the database
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error

 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     description: Retrieve list of orders with filtering options
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, processing, completed, cancelled]
 *       - in: query
 *         name: customer_id
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of orders
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create a new order
 *     description: Create an order with items
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderInput'
 *     responses:
 *       201:
 *         description: Order created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error

 * /api/customers:
 *   get:
 *     summary: Get all customers
 *     description: Retrieve list of customers with search
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name or email
 *     responses:
 *       200:
 *         description: List of customers
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create a new customer
 *     description: Add a new customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomerInput'
 *     responses:
 *       201:
 *         description: Customer created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error

 * /api/reports/sales:
 *   get:
 *     summary: Get sales report
 *     description: Retrieve sales statistics
 *     parameters:
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Sales report
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Product Name"
 *         price:
 *           type: number
 *           format: float
 *           example: 99.99
 *         quantity:
 *           type: integer
 *           example: 100
 *         category:
 *           type: string
 *           example: "Electronics"
 *         description:
 *           type: string
 *           example: "Product description"
 *         created_at:
 *           type: string
 *           format: date-time
 *
 *     ProductInput:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           example: "New Product"
 *         price:
 *           type: number
 *           format: float
 *           example: 99.99
 *         quantity:
 *           type: integer
 *           example: 100
 *         category:
 *           type: string
 *           example: "Electronics"
 *         description:
 *           type: string
 *
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         customer_id:
 *           type: integer
 *         total_amount:
 *           type: number
 *           format: float
 *         status:
 *           type: string
 *           enum: [pending, processing, completed, cancelled]
 *         created_at:
 *           type: string
 *           format: date-time
 *
 *     OrderInput:
 *       type: object
 *       required:
 *         - customer_id
 *         - items
 *       properties:
 *         customer_id:
 *           type: integer
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *
 *     Customer:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         address:
 *           type: string
 *
 *     CustomerInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         phone:
 *           type: string
 *         address:
 *           type: string
 */
