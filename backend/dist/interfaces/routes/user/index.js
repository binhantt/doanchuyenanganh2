"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routeBuilder_1 = require("../../../shared/utils/routeBuilder");
const service_controller_1 = require("../../controllers/service.controller");
const ServiceService_1 = require("../../../application/services/ServiceService");
const ServiceRepository_1 = require("../../../infrastructure/repositories/ServiceRepository");
const router = (0, express_1.Router)();
// Gallery DI (needed first for other services)
const gallery_controller_1 = require("../../controllers/gallery.controller");
const GalleryService_1 = require("../../../application/services/GalleryService");
const GalleryRepository_1 = require("../../../infrastructure/repositories/GalleryRepository");
const galleryRepository = new GalleryRepository_1.GalleryRepository();
const galleryService = new GalleryService_1.GalleryService(galleryRepository);
const galleryController = new gallery_controller_1.GalleryController(galleryService);
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
const chatbot_controller_1 = require("../../controllers/chatbot.controller");
const ChatbotService_1 = require("../../../application/services/ChatbotService");
const chatbotService = new ChatbotService_1.ChatbotService(packageRepository, productRepository, serviceRepository, faqRepository, galleryRepository // Add gallery repository for images
);
const chatbotController = new chatbot_controller_1.ChatbotController(chatbotService);
const voucherRepository = new VoucherRepository_1.VoucherRepository();
const voucherService = new VoucherService_1.VoucherService(voucherRepository);
const voucherController = new voucher_controller_1.VoucherController(voucherService);
// Define user route groups
const userRouteGroups = [
    {
        basePath: '/services',
        routes: [
            {
                method: 'get',
                path: '/',
                handler: (req, res) => {
                    req.query.active = 'true';
                    return serviceController.list(req, res);
                },
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
        ],
    },
    {
        basePath: '/decorations',
        routes: [
            {
                method: 'get',
                path: '/',
                handler: (req, res) => {
                    req.query.active = 'true';
                    return decorationController.list(req, res);
                },
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
        ],
    },
    {
        basePath: '/packages',
        routes: [
            {
                method: 'get',
                path: '/',
                handler: (req, res) => {
                    req.query.active = 'true';
                    return packageController.list(req, res);
                },
            },
            {
                method: 'get',
                path: '/popular',
                handler: (req, res) => {
                    req.query.popular = 'true';
                    return packageController.list(req, res);
                },
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
        ],
    },
    {
        basePath: '/products',
        routes: [
            {
                method: 'get',
                path: '/',
                handler: (req, res) => {
                    req.query.isActive = 'true';
                    return productController.getAllProducts(req, res);
                },
            },
            {
                method: 'get',
                path: '/featured',
                handler: (req, res) => {
                    req.query.isActive = 'true';
                    req.query.isFeatured = 'true';
                    return productController.getAllProducts(req, res);
                },
            },
            {
                method: 'get',
                path: '/category/:category',
                handler: (req, res) => {
                    req.query.isActive = 'true';
                    req.query.category = req.params.category;
                    return productController.getAllProducts(req, res);
                },
            },
            {
                method: 'get',
                path: '/slug/:slug',
                handler: (req, res) => productController.getProductBySlug(req, res),
            },
            {
                method: 'get',
                path: '/:id',
                handler: (req, res) => productController.getProductById(req, res),
            },
        ],
    },
    {
        basePath: '/galleries',
        routes: [
            {
                method: 'get',
                path: '/',
                handler: (req, res) => {
                    req.query.isActive = 'true';
                    return galleryController.getAllGalleries(req, res);
                },
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
        ],
    },
    {
        basePath: '/testimonials',
        routes: [
            {
                method: 'get',
                path: '/',
                handler: (req, res) => testimonialController.getActiveTestimonials(req, res),
            },
            {
                method: 'get',
                path: '/language/:language',
                handler: (req, res) => testimonialController.getTestimonialsByLanguage(req, res),
            },
            {
                method: 'get',
                path: '/:id',
                handler: (req, res) => testimonialController.getTestimonialById(req, res),
            },
            {
                method: 'post',
                path: '/submit',
                handler: (req, res) => testimonialController.submitTestimonial(req, res),
            },
        ],
    },
    {
        basePath: '/faqs',
        routes: [
            {
                method: 'get',
                path: '/',
                handler: (req, res) => faqController.getActiveFAQs(req, res),
            },
            {
                method: 'get',
                path: '/category/:category',
                handler: (req, res) => faqController.getFAQsByCategory(req, res),
            },
            {
                method: 'get',
                path: '/language/:language',
                handler: (req, res) => faqController.getFAQsByLanguage(req, res),
            },
            {
                method: 'get',
                path: '/category/:category/language/:language',
                handler: (req, res) => faqController.getFAQsByCategoryAndLanguage(req, res),
            },
            {
                method: 'get',
                path: '/:id',
                handler: (req, res) => faqController.getFAQById(req, res),
            },
        ],
    },
    {
        basePath: '/consultations',
        routes: [
            {
                method: 'post',
                path: '/',
                handler: (req, res) => consultationController.bookConsultation(req, res),
            },
            {
                method: 'get',
                path: '/email/:email',
                handler: (req, res) => consultationController.getConsultationsByEmail(req, res),
            },
            {
                method: 'get',
                path: '/:id',
                handler: (req, res) => consultationController.getConsultationById(req, res),
            },
        ],
    },
    {
        basePath: '/promotions',
        routes: [
            {
                method: 'get',
                path: '/code/:code',
                handler: (req, res) => promotionController.getByCode(req, res),
            },
        ],
    },
    {
        basePath: '/vouchers',
        routes: [
            {
                method: 'post',
                path: '/validate',
                handler: (req, res) => voucherController.validateVoucher(req, res),
            },
            {
                method: 'get',
                path: '/active',
                handler: (req, res) => voucherController.getActiveVouchers(req, res),
            },
            {
                method: 'get',
                path: '/:code',
                handler: (req, res) => voucherController.getVoucherByCode(req, res),
            },
        ],
    },
    {
        basePath: '/orders',
        routes: [
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
        ],
    },
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
// Build grouped routes
(0, routeBuilder_1.buildGroupedRoutes)(router, userRouteGroups);
exports.default = router;
//# sourceMappingURL=index.js.map