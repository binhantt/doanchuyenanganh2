"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routeBuilder_1 = require("../../../shared/utils/routeBuilder");
// import { authenticate, requireAdmin } from '../../middlewares/auth.middleware';
const service_controller_1 = require("../../controllers/service.controller");
const ServiceService_1 = require("../../../application/services/ServiceService");
const ServiceRepository_1 = require("../../../infrastructure/repositories/ServiceRepository");
const router = (0, express_1.Router)();
// // Apply authentication and admin check to all admin routes
// router.use(authenticate);
// router.use(requireAdmin);
// Gallery DI (needed first for other services)
const gallery_controller_1 = require("../../controllers/gallery.controller");
const GalleryService_1 = require("../../../application/services/GalleryService");
const GalleryRepository_1 = require("../../../infrastructure/repositories/GalleryRepository");
const galleryRepository = new GalleryRepository_1.GalleryRepository();
const galleryService = new GalleryService_1.GalleryService(galleryRepository);
const galleryController = new gallery_controller_1.GalleryController(galleryService);
// Category DI
const category_controller_1 = require("../../controllers/category.controller");
const CategoryService_1 = require("../../../application/services/CategoryService");
const CategoryRepository_1 = require("../../../infrastructure/repositories/CategoryRepository");
const categoryRepository = new CategoryRepository_1.CategoryRepository();
const categoryService = new CategoryService_1.CategoryService(categoryRepository);
const categoryController = new category_controller_1.CategoryController(categoryService);
// Image and Feature DI (needed for services)
const ImageRepository_1 = require("../../../infrastructure/repositories/ImageRepository");
const FeatureRepository_1 = require("../../../infrastructure/repositories/FeatureRepository");
const imageRepository = new ImageRepository_1.ImageRepository();
const featureRepository = new FeatureRepository_1.FeatureRepository();
// Dependency injection
const serviceRepository = new ServiceRepository_1.ServiceRepository();
const serviceService = new ServiceService_1.ServiceService(serviceRepository, imageRepository, featureRepository, galleryRepository);
const serviceController = new service_controller_1.ServiceController(serviceService);
// Decoration DI
const decoration_controller_1 = require("../../controllers/decoration.controller");
const DecorationService_1 = require("../../../application/services/DecorationService");
const DecorationRepository_1 = require("../../../infrastructure/repositories/DecorationRepository");
const decorationRepository = new DecorationRepository_1.DecorationRepository();
const decorationService = new DecorationService_1.DecorationService(decorationRepository);
const decorationController = new decoration_controller_1.DecorationController(decorationService);
// Package DI
const package_controller_1 = require("../../controllers/package.controller");
const PackageService_1 = require("../../../application/services/PackageService");
const PackageRepository_1 = require("../../../infrastructure/repositories/PackageRepository");
const packageRepository = new PackageRepository_1.PackageRepository();
const packageService = new PackageService_1.PackageService(packageRepository);
const packageController = new package_controller_1.PackageController(packageService);
// Product DI
const product_controller_1 = require("../../controllers/product.controller");
const ProductService_1 = require("../../../application/services/ProductService");
const ProductRepository_1 = require("../../../infrastructure/repositories/ProductRepository");
const productRepository = new ProductRepository_1.ProductRepository();
const productService = new ProductService_1.ProductService(productRepository);
const productController = new product_controller_1.ProductController(productService);
// Testimonial DI
const testimonial_controller_1 = require("../../controllers/testimonial.controller");
const TestimonialService_1 = require("../../../application/services/TestimonialService");
const TestimonialRepository_1 = require("../../../infrastructure/repositories/TestimonialRepository");
const testimonialRepository = new TestimonialRepository_1.TestimonialRepository();
const testimonialService = new TestimonialService_1.TestimonialService(testimonialRepository);
const testimonialController = new testimonial_controller_1.TestimonialController(testimonialService);
// FAQ DI
const faq_controller_1 = require("../../controllers/faq.controller");
const FAQService_1 = require("../../../application/services/FAQService");
const FAQRepository_1 = require("../../../infrastructure/repositories/FAQRepository");
const faqRepository = new FAQRepository_1.FAQRepository();
const faqService = new FAQService_1.FAQService(faqRepository);
const faqController = new faq_controller_1.FAQController(faqService);
// Consultation DI
const consultation_controller_1 = require("../../controllers/consultation.controller");
const ConsultationService_1 = require("../../../application/services/ConsultationService");
const ConsultationRepository_1 = require("../../../infrastructure/repositories/ConsultationRepository");
const consultationRepository = new ConsultationRepository_1.ConsultationRepository();
const consultationService = new ConsultationService_1.ConsultationService(consultationRepository);
const consultationController = new consultation_controller_1.ConsultationController(consultationService);
// Order DI
const order_controller_1 = require("../../controllers/order.controller");
const OrderService_1 = require("../../../application/services/OrderService");
const OrderRepository_1 = require("../../../infrastructure/repositories/OrderRepository");
const orderRepository = new OrderRepository_1.OrderRepository();
const orderService = new OrderService_1.OrderService(orderRepository);
const orderController = new order_controller_1.OrderController(orderService);
// Promotion DI
const promotion_controller_1 = require("../../controllers/promotion.controller");
const PromotionService_1 = require("../../../application/services/PromotionService");
const PromotionRepository_1 = require("../../../infrastructure/repositories/PromotionRepository");
const promotionRepository = new PromotionRepository_1.PromotionRepository();
const promotionService = new PromotionService_1.PromotionService(promotionRepository);
const promotionController = new promotion_controller_1.PromotionController(promotionService);
// Voucher DI
const voucher_controller_1 = require("../../controllers/voucher.controller");
const VoucherService_1 = require("../../../application/services/VoucherService");
const VoucherRepository_1 = require("../../../infrastructure/repositories/VoucherRepository");
const voucherRepository = new VoucherRepository_1.VoucherRepository();
const voucherService = new VoucherService_1.VoucherService(voucherRepository);
const voucherController = new voucher_controller_1.VoucherController(voucherService);
// Dashboard DI
const dashboard_controller_1 = require("../../controllers/dashboard.controller");
const dashboardController = new dashboard_controller_1.DashboardController();
// Monitoring DI
const monitoring_controller_1 = require("../../controllers/monitoring.controller");
const monitoringController = new monitoring_controller_1.MonitoringController();
// User DI
const user_controller_1 = require("../../controllers/user.controller");
const UserService_1 = require("../../../application/services/UserService");
const UserRepository_1 = require("../../../infrastructure/repositories/UserRepository");
const userRepository = new UserRepository_1.UserRepository();
const userService = new UserService_1.UserService(userRepository);
const userController = new user_controller_1.UserController(userService);
// Auth DI
const auth_controller_1 = require("../../controllers/auth.controller");
const AuthService_1 = require("../../../application/services/AuthService");
const authService = new AuthService_1.AuthService(userRepository);
const authController = new auth_controller_1.AuthController(authService);
// Define admin route groups
const adminRouteGroups = [
    {
        basePath: '/auth',
        routes: [
            {
                method: 'post',
                path: '/login',
                handler: (req, res) => authController.login(req, res),
            },
            {
                method: 'post',
                path: '/verify',
                handler: (req, res) => authController.verify(req, res),
            },
        ],
    },
    {
        basePath: '/dashboard',
        routes: [
            {
                method: 'get',
                path: '/stats',
                handler: (req, res) => dashboardController.getStats(req, res),
            },
        ],
    },
    {
        basePath: '/monitoring',
        routes: [
            {
                method: 'get',
                path: '/connections',
                handler: (req, res) => monitoringController.getActiveConnections(req, res),
            },
            {
                method: 'get',
                path: '/stats',
                handler: (req, res) => monitoringController.getConnectionStats(req, res),
            },
            {
                method: 'get',
                path: '/dashboard',
                handler: (req, res) => monitoringController.getDashboard(req, res),
            },
        ],
    },
    {
        basePath: '/categories',
        routes: [
            {
                method: 'get',
                path: '/',
                handler: (req, res) => categoryController.list(req, res),
            },
            {
                method: 'get',
                path: '/slug/:slug',
                handler: (req, res) => categoryController.getBySlug(req, res),
            },
            {
                method: 'get',
                path: '/:id',
                handler: (req, res) => categoryController.getById(req, res),
            },
            {
                method: 'get',
                path: '/:id/products',
                handler: (req, res) => productController.getAllProducts(req, res),
            },
            {
                method: 'post',
                path: '/',
                handler: (req, res) => categoryController.create(req, res),
            },
            {
                method: 'put',
                path: '/:id',
                handler: (req, res) => categoryController.update(req, res),
            },
            {
                method: 'delete',
                path: '/:id',
                handler: (req, res) => categoryController.delete(req, res),
            },
        ],
    },
    {
        basePath: '/services',
        routes: [
            {
                method: 'get',
                path: '/',
                handler: (req, res) => serviceController.list(req, res),
            },
            {
                method: 'get',
                path: '/slug/:slug',
                handler: (req, res) => serviceController.getBySlug(req, res),
            },
            {
                method: 'get',
                path: '/:id/images',
                handler: (req, res) => serviceController.getImages(req, res),
            },
            {
                method: 'get',
                path: '/:id',
                handler: (req, res) => serviceController.getById(req, res),
            },
            {
                method: 'post',
                path: '/',
                handler: (req, res) => serviceController.create(req, res),
            },
            {
                method: 'post',
                path: '/:id/images',
                handler: (req, res) => serviceController.addImage(req, res),
            },
            {
                method: 'put',
                path: '/:id',
                handler: (req, res) => serviceController.update(req, res),
            },
            {
                method: 'delete',
                path: '/:id/images/:imageId',
                handler: (req, res) => serviceController.removeImage(req, res),
            },
            {
                method: 'delete',
                path: '/:id',
                handler: (req, res) => serviceController.delete(req, res),
            },
        ],
    },
    {
        basePath: '/decorations',
        routes: [
            {
                method: 'get',
                path: '/',
                handler: (req, res) => decorationController.list(req, res),
            },
            {
                method: 'get',
                path: '/slug/:slug',
                handler: (req, res) => decorationController.getBySlug(req, res),
            },
            {
                method: 'get',
                path: '/:id',
                handler: (req, res) => decorationController.getById(req, res),
            },
            {
                method: 'post',
                path: '/',
                handler: (req, res) => decorationController.create(req, res),
            },
            {
                method: 'put',
                path: '/:id',
                handler: (req, res) => decorationController.update(req, res),
            },
            {
                method: 'delete',
                path: '/:id',
                handler: (req, res) => decorationController.delete(req, res),
            },
        ],
    },
    {
        basePath: '/packages',
        routes: [
            {
                method: 'get',
                path: '/',
                handler: (req, res) => packageController.list(req, res),
            },
            {
                method: 'get',
                path: '/slug/:slug',
                handler: (req, res) => packageController.getBySlug(req, res),
            },
            {
                method: 'get',
                path: '/:id',
                handler: (req, res) => packageController.getById(req, res),
            },
            {
                method: 'post',
                path: '/',
                handler: (req, res) => packageController.create(req, res),
            },
            {
                method: 'put',
                path: '/:id',
                handler: (req, res) => packageController.update(req, res),
            },
            {
                method: 'delete',
                path: '/:id',
                handler: (req, res) => packageController.delete(req, res),
            },
        ],
    },
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
                path: '/slug/:slug',
                handler: (req, res) => productController.getProductBySlug(req, res),
            },
            {
                method: 'get',
                path: '/:id/stock',
                handler: (req, res) => productController.getStock(req, res),
            },
            {
                method: 'get',
                path: '/:id',
                handler: (req, res) => productController.getProductById(req, res),
            },
            {
                method: 'post',
                path: '/',
                handler: (req, res) => productController.createProduct(req, res),
            },
            {
                method: 'put',
                path: '/:id',
                handler: (req, res) => productController.updateProduct(req, res),
            },
            {
                method: 'put',
                path: '/:id/stock',
                handler: (req, res) => productController.updateStock(req, res),
            },
            {
                method: 'delete',
                path: '/:id',
                handler: (req, res) => productController.deleteProduct(req, res),
            },
        ],
    },
    {
        basePath: '/galleries',
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
            {
                method: 'get',
                path: '/related/:relatedType/:relatedId',
                handler: (req, res) => galleryController.getGalleriesByRelated(req, res),
            },
            {
                method: 'get',
                path: '/primary/:relatedType/:relatedId',
                handler: (req, res) => galleryController.getPrimaryImage(req, res),
            },
            {
                method: 'post',
                path: '/',
                handler: (req, res) => galleryController.createGallery(req, res),
            },
            {
                method: 'put',
                path: '/:id',
                handler: (req, res) => galleryController.updateGallery(req, res),
            },
            {
                method: 'put',
                path: '/:id/primary',
                handler: (req, res) => galleryController.setPrimaryImage(req, res),
            },
            {
                method: 'put',
                path: '/:id/order',
                handler: (req, res) => galleryController.updateDisplayOrder(req, res),
            },
            {
                method: 'delete',
                path: '/:id',
                handler: (req, res) => galleryController.deleteGallery(req, res),
            },
        ],
    },
    {
        basePath: '/testimonials',
        routes: [
            {
                method: 'get',
                path: '/',
                handler: (req, res) => testimonialController.getAllTestimonials(req, res),
            },
            {
                method: 'get',
                path: '/:id',
                handler: (req, res) => testimonialController.getTestimonialById(req, res),
            },
            {
                method: 'post',
                path: '/',
                handler: (req, res) => testimonialController.createTestimonial(req, res),
            },
            {
                method: 'put',
                path: '/:id',
                handler: (req, res) => testimonialController.updateTestimonial(req, res),
            },
            {
                method: 'delete',
                path: '/:id',
                handler: (req, res) => testimonialController.deleteTestimonial(req, res),
            },
        ],
    },
    {
        basePath: '/faqs',
        routes: [
            {
                method: 'get',
                path: '/',
                handler: (req, res) => faqController.getAllFAQs(req, res),
            },
            {
                method: 'get',
                path: '/:id',
                handler: (req, res) => faqController.getFAQById(req, res),
            },
            {
                method: 'post',
                path: '/',
                handler: (req, res) => faqController.createFAQ(req, res),
            },
            {
                method: 'put',
                path: '/:id',
                handler: (req, res) => faqController.updateFAQ(req, res),
            },
            {
                method: 'delete',
                path: '/:id',
                handler: (req, res) => faqController.deleteFAQ(req, res),
            },
        ],
    },
    {
        basePath: '/consultations',
        routes: [
            {
                method: 'get',
                path: '/',
                handler: (req, res) => consultationController.getAllConsultations(req, res),
            },
            {
                method: 'get',
                path: '/:id',
                handler: (req, res) => consultationController.getConsultationById(req, res),
            },
            {
                method: 'get',
                path: '/status/:status',
                handler: (req, res) => consultationController.getConsultationsByStatus(req, res),
            },
            {
                method: 'put',
                path: '/:id',
                handler: (req, res) => consultationController.updateConsultation(req, res),
            },
            {
                method: 'delete',
                path: '/:id',
                handler: (req, res) => consultationController.deleteConsultation(req, res),
            },
        ],
    },
    {
        basePath: '/orders',
        routes: [
            {
                method: 'get',
                path: '/',
                handler: (req, res) => orderController.getAllOrders(req, res),
            },
            {
                method: 'get',
                path: '/:id',
                handler: (req, res) => orderController.getOrderById(req, res),
            },
            {
                method: 'get',
                path: '/status/:status',
                handler: (req, res) => orderController.getOrdersByStatus(req, res),
            },
            {
                method: 'put',
                path: '/:id/status',
                handler: (req, res) => orderController.updateOrderStatus(req, res),
            },
            {
                method: 'put',
                path: '/:id',
                handler: (req, res) => orderController.updateOrder(req, res),
            },
            {
                method: 'delete',
                path: '/:id',
                handler: (req, res) => orderController.deleteOrder(req, res),
            },
        ],
    },
    {
        basePath: '/promotions',
        routes: [
            {
                method: 'get',
                path: '/',
                handler: (req, res) => promotionController.list(req, res),
            },
            {
                method: 'get',
                path: '/code/:code',
                handler: (req, res) => promotionController.getByCode(req, res),
            },
            {
                method: 'get',
                path: '/service/:serviceId',
                handler: (req, res) => promotionController.getByService(req, res),
            },
            {
                method: 'get',
                path: '/package/:packageId',
                handler: (req, res) => promotionController.getByPackage(req, res),
            },
            {
                method: 'get',
                path: '/:id',
                handler: (req, res) => promotionController.getById(req, res),
            },
            {
                method: 'post',
                path: '/',
                handler: (req, res) => promotionController.create(req, res),
            },
            {
                method: 'put',
                path: '/:id',
                handler: (req, res) => promotionController.update(req, res),
            },
            {
                method: 'delete',
                path: '/:id',
                handler: (req, res) => promotionController.delete(req, res),
            },
        ],
    },
    {
        basePath: '/vouchers',
        routes: [
            {
                method: 'get',
                path: '/',
                handler: (req, res) => voucherController.getAllVouchers(req, res),
            },
            {
                method: 'get',
                path: '/active',
                handler: (req, res) => voucherController.getActiveVouchers(req, res),
            },
            {
                method: 'get',
                path: '/code/:code',
                handler: (req, res) => voucherController.getVoucherByCode(req, res),
            },
            {
                method: 'get',
                path: '/:id',
                handler: (req, res) => voucherController.getVoucherById(req, res),
            },
            {
                method: 'post',
                path: '/',
                handler: (req, res) => voucherController.createVoucher(req, res),
            },
            {
                method: 'put',
                path: '/:id',
                handler: (req, res) => voucherController.updateVoucher(req, res),
            },
            {
                method: 'delete',
                path: '/:id',
                handler: (req, res) => voucherController.deleteVoucher(req, res),
            },
        ],
    },
    {
        basePath: '/users',
        routes: [
            {
                method: 'get',
                path: '/',
                handler: (req, res) => userController.getAllUsers(req, res),
            },
            {
                method: 'get',
                path: '/:id',
                handler: (req, res) => userController.getUserById(req, res),
            },
            {
                method: 'post',
                path: '/',
                handler: (req, res) => userController.createUser(req, res),
            },
            {
                method: 'put',
                path: '/:id',
                handler: (req, res) => userController.updateUser(req, res),
            },
            {
                method: 'put',
                path: '/:id/toggle-status',
                handler: (req, res) => userController.toggleUserStatus(req, res),
            },
            {
                method: 'delete',
                path: '/:id',
                handler: (req, res) => userController.deleteUser(req, res),
            },
        ],
    },
];
// Build grouped routes
(0, routeBuilder_1.buildGroupedRoutes)(router, adminRouteGroups);
exports.default = router;
//# sourceMappingURL=index.js.map