"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("../../controllers/order.controller");
const OrderService_1 = require("../../../application/services/OrderService");
const OrderRepository_1 = require("../../../infrastructure/repositories/OrderRepository");
const package_controller_1 = require("../../controllers/package.controller");
const PackageService_1 = require("../../../application/services/PackageService");
const PackageRepository_1 = require("../../../infrastructure/repositories/PackageRepository");
const product_controller_1 = require("../../controllers/product.controller");
const ProductService_1 = require("../../../application/services/ProductService");
const ProductRepository_1 = require("../../../infrastructure/repositories/ProductRepository");
const gallery_controller_1 = require("../../controllers/gallery.controller");
const GalleryService_1 = require("../../../application/services/GalleryService");
const GalleryRepository_1 = require("../../../infrastructure/repositories/GalleryRepository");
const testimonial_controller_1 = require("../../controllers/testimonial.controller");
const TestimonialService_1 = require("../../../application/services/TestimonialService");
const TestimonialRepository_1 = require("../../../infrastructure/repositories/TestimonialRepository");
const routeBuilder_1 = require("../../../shared/utils/routeBuilder");
const router = (0, express_1.Router)();
// Initialize Order dependencies
const orderRepository = new OrderRepository_1.OrderRepository();
const orderService = new OrderService_1.OrderService(orderRepository);
const orderController = new order_controller_1.OrderController(orderService);
// Initialize Package dependencies
const packageRepository = new PackageRepository_1.PackageRepository();
const packageService = new PackageService_1.PackageService(packageRepository);
const packageController = new package_controller_1.PackageController(packageService);
// Initialize Product dependencies
const productRepository = new ProductRepository_1.ProductRepository();
const productService = new ProductService_1.ProductService(productRepository);
const productController = new product_controller_1.ProductController(productService);
// Initialize Gallery dependencies
const galleryRepository = new GalleryRepository_1.GalleryRepository();
const galleryService = new GalleryService_1.GalleryService(galleryRepository);
const galleryController = new gallery_controller_1.GalleryController(galleryService);
// Initialize Testimonial dependencies
const testimonialRepository = new TestimonialRepository_1.TestimonialRepository();
const testimonialService = new TestimonialService_1.TestimonialService(testimonialRepository);
const testimonialController = new testimonial_controller_1.TestimonialController(testimonialService);
// Initialize Chatbot dependencies
const chatbot_controller_1 = require("../../controllers/chatbot.controller");
const ChatbotService_1 = require("../../../application/services/ChatbotService");
const FAQRepository_1 = require("../../../infrastructure/repositories/FAQRepository");
const ServiceRepository_1 = require("../../../infrastructure/repositories/ServiceRepository");
const faqRepository = new FAQRepository_1.FAQRepository();
const serviceRepository = new ServiceRepository_1.ServiceRepository();
const chatbotService = new ChatbotService_1.ChatbotService(packageRepository, productRepository, serviceRepository, faqRepository, galleryRepository // Add gallery repository for images
);
const chatbotController = new chatbot_controller_1.ChatbotController(chatbotService);
// App API routes
const APP = [
    // Auth & Orders
    {
        basePath: '/auth',
        routes: [
            {
                method: 'post',
                path: '/verify',
                handler: (req, res) => orderController.verifyOrder(req, res),
            },
            {
                method: 'post',
                path: '/register',
                handler: (req, res) => orderController.registerOrder(req, res),
            },
        ],
    },
    {
        basePath: '/orders',
        routes: [
            {
                method: 'get',
                path: '/email/:email',
                handler: (req, res) => orderController.getOrdersByEmail(req, res),
            },
            {
                method: 'get',
                path: '/:id',
                handler: (req, res) => orderController.getOrderById(req, res),
            },
            {
                method: 'post',
                path: '/',
                handler: (req, res) => orderController.createOrder(req, res),
            },
            {
                method: 'post',
                path: '/apply-voucher',
                handler: (req, res) => orderController.applyVoucher(req, res),
            },
        ],
    },
    // Packages
    {
        basePath: '/packages',
        routes: [
            {
                method: 'get',
                path: '/',
                handler: (req, res) => packageController.getAllPackages(req, res),
            },
            {
                method: 'get',
                path: '/:id',
                handler: (req, res) => packageController.getPackageById(req, res),
            },
        ],
    },
    // Products
    {
        basePath: '/products',
        routes: [
            {
                method: 'get',
                path: '/',
                handler: (req, res) => productController.getAllProducts(req, res),
            },
            {
                method: 'get',
                path: '/:id',
                handler: (req, res) => productController.getProductById(req, res),
            },
            {
                method: 'get',
                path: '/category/:category',
                handler: (req, res) => productController.getProductsByCategory(req, res),
            },
        ],
    },
    // Gallery
    {
        basePath: '/gallery',
        routes: [
            {
                method: 'get',
                path: '/',
                handler: (req, res) => galleryController.getAllGalleries(req, res),
            },
            {
                method: 'get',
                path: '/:id',
                handler: (req, res) => galleryController.getGalleryById(req, res),
            },
        ],
    },
    // Testimonials
    {
        basePath: '/testimonials',
        routes: [
            {
                method: 'get',
                path: '/',
                handler: (req, res) => testimonialController.getAllTestimonials(req, res),
            },
        ],
    },
    // Chatbot
    {
        basePath: '/chatbot',
        routes: [
            {
                method: 'post',
                path: '/chat',
                handler: (req, res) => chatbotController.sendMessage(req, res),
            },
            {
                method: 'get',
                path: '/quick-replies',
                handler: (req, res) => chatbotController.getQuickReplies(req, res),
            },
            {
                method: 'get',
                path: '/info',
                handler: (req, res) => chatbotController.getInfo(req, res),
            },
        ],
    },
];
(0, routeBuilder_1.buildGroupedRoutes)(router, APP);
exports.default = router;
//# sourceMappingURL=index.js.map