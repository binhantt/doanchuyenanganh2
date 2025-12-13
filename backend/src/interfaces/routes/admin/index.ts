import { Router } from 'express';
import { buildGroupedRoutes, RouteGroup } from '../../../shared/utils/routeBuilder';
// import { authenticate, requireAdmin } from '../../middlewares/auth.middleware';
import { ServiceController } from '../../controllers/service.controller';
import { ServiceService } from '../../../application/services/ServiceService';
import { ServiceRepository } from '../../../infrastructure/repositories/ServiceRepository';

const router = Router();

// // Apply authentication and admin check to all admin routes
// router.use(authenticate);
// router.use(requireAdmin);

// Gallery DI (needed first for other services)
import { GalleryController } from '../../controllers/gallery.controller';
import { GalleryService } from '../../../application/services/GalleryService';
import { GalleryRepository } from '../../../infrastructure/repositories/GalleryRepository';
import { AlbumService } from '../../../application/services/AlbumService';
import { AlbumRepository } from '../../../infrastructure/repositories/AlbumRepository';

const galleryRepository = new GalleryRepository();
const galleryService = new GalleryService(galleryRepository);
const albumRepository = new AlbumRepository();
const albumService = new AlbumService(albumRepository, galleryRepository);
const galleryController = new GalleryController(galleryService, albumService);

// Category DI
import { CategoryController } from '../../controllers/category.controller';
import { CategoryService } from '../../../application/services/CategoryService';
import { CategoryRepository } from '../../../infrastructure/repositories/CategoryRepository';

const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);

// Image and Feature DI (needed for services)
import { ImageRepository } from '../../../infrastructure/repositories/ImageRepository';
import { FeatureRepository } from '../../../infrastructure/repositories/FeatureRepository';

const imageRepository = new ImageRepository();
const featureRepository = new FeatureRepository();

// Dependency injection
const serviceRepository = new ServiceRepository();
const serviceService = new ServiceService(serviceRepository, imageRepository, featureRepository, galleryRepository);
const serviceController = new ServiceController(serviceService);

// Decoration DI
import { DecorationController } from '../../controllers/decoration.controller';
import { DecorationService } from '../../../application/services/DecorationService';
import { DecorationRepository } from '../../../infrastructure/repositories/DecorationRepository';

const decorationRepository = new DecorationRepository();
const decorationService = new DecorationService(decorationRepository);
const decorationController = new DecorationController(decorationService);

// Package DI
import { PackageController } from '../../controllers/package.controller';
import { PackageService } from '../../../application/services/PackageService';
import { PackageRepository } from '../../../infrastructure/repositories/PackageRepository';

const packageRepository = new PackageRepository();
const packageService = new PackageService(packageRepository);
const packageController = new PackageController(packageService);

// Product DI
import { ProductController } from '../../controllers/product.controller';
import { ProductService } from '../../../application/services/ProductService';
import { ProductRepository } from '../../../infrastructure/repositories/ProductRepository';

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

// Testimonial DI
import { TestimonialController } from '../../controllers/testimonial.controller';
import { TestimonialService } from '../../../application/services/TestimonialService';
import { TestimonialRepository } from '../../../infrastructure/repositories/TestimonialRepository';

const testimonialRepository = new TestimonialRepository();
const testimonialService = new TestimonialService(testimonialRepository);
const testimonialController = new TestimonialController(testimonialService);

// FAQ DI
import { FAQController } from '../../controllers/faq.controller';
import { FAQService } from '../../../application/services/FAQService';
import { FAQRepository } from '../../../infrastructure/repositories/FAQRepository';

const faqRepository = new FAQRepository();
const faqService = new FAQService(faqRepository);
const faqController = new FAQController(faqService);

// Consultation DI
import { ConsultationController } from '../../controllers/consultation.controller';
import { ConsultationService } from '../../../application/services/ConsultationService';
import { ConsultationRepository } from '../../../infrastructure/repositories/ConsultationRepository';

const consultationRepository = new ConsultationRepository();
const consultationService = new ConsultationService(consultationRepository);
const consultationController = new ConsultationController(consultationService);

// Order DI
import { OrderController } from '../../controllers/order.controller';
import { OrderService } from '../../../application/services/OrderService';
import { OrderRepository } from '../../../infrastructure/repositories/OrderRepository';

const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository);
const orderController = new OrderController(orderService);

// Promotion DI
import { PromotionController } from '../../controllers/promotion.controller';
import { PromotionService } from '../../../application/services/PromotionService';
import { PromotionRepository } from '../../../infrastructure/repositories/PromotionRepository';

const promotionRepository = new PromotionRepository();
const promotionService = new PromotionService(promotionRepository);
const promotionController = new PromotionController(promotionService);

// Voucher DI
import { VoucherController } from '../../controllers/voucher.controller';
import { VoucherService } from '../../../application/services/VoucherService';
import { VoucherRepository } from '../../../infrastructure/repositories/VoucherRepository';

const voucherRepository = new VoucherRepository();
const voucherService = new VoucherService(voucherRepository);
const voucherController = new VoucherController(voucherService);

// Dashboard DI
import { DashboardController } from '../../controllers/dashboard.controller';

const dashboardController = new DashboardController();

// Monitoring DI
import { MonitoringController } from '../../controllers/monitoring.controller';

const monitoringController = new MonitoringController();

// User DI
import { UserController } from '../../controllers/user.controller';
import { UserService } from '../../../application/services/UserService';
import { UserRepository } from '../../../infrastructure/repositories/UserRepository';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// Auth DI
import { AuthController } from '../../controllers/auth.controller';
import { AuthService } from '../../../application/services/AuthService';

const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

// Define admin route groups
const adminRouteGroups: RouteGroup[] = [
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
        path: '/register',
        handler: (req, res) => authController.register(req, res),
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
        path: '/albums',
        handler: (req, res) => galleryController.getAllAlbums(req, res),
      },
      {
        method: 'get',
        path: '/albums/:id',
        handler: (req, res) => galleryController.getAlbumById(req, res),
      },
      {
        method: 'get',
        path: '/albums/:albumId/images',
        handler: (req, res) => galleryController.getImagesByAlbum(req, res),
      },
      {
        method: 'post',
        path: '/albums',
        handler: (req, res) => galleryController.createAlbum(req, res),
      },
      {
        method: 'put',
        path: '/albums/:id',
        handler: (req, res) => galleryController.updateAlbum(req, res),
      },
      {
        method: 'delete',
        path: '/albums/:id',
        handler: (req, res) => galleryController.deleteAlbum(req, res),
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
buildGroupedRoutes(router, adminRouteGroups);

export default router;
