import { Router } from 'express';
import { buildGroupedRoutes, RouteGroup } from '../../../shared/utils/routeBuilder';
import { authenticate, requireAdmin } from '../../middlewares/auth.middleware';
import { ServiceController } from '../../controllers/service.controller';
import { ServiceService } from '../../../application/services/ServiceService';
import { ServiceRepository } from '../../../infrastructure/repositories/ServiceRepository';

const router = Router();

// Apply authentication and admin check to all admin routes
router.use(authenticate);
router.use(requireAdmin);

// Dependency injection
const serviceRepository = new ServiceRepository();
const serviceService = new ServiceService(serviceRepository);
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

// Gallery DI
import { GalleryController } from '../../controllers/gallery.controller';
import { GalleryService } from '../../../application/services/GalleryService';
import { GalleryRepository } from '../../../infrastructure/repositories/GalleryRepository';

const galleryRepository = new GalleryRepository();
const galleryService = new GalleryService(galleryRepository);
const galleryController = new GalleryController(galleryService);

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

// Define admin route groups
const adminRouteGroups: RouteGroup[] = [
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
        path: '/:id',
        handler: (req, res) => serviceController.getById(req, res),
      },
      {
        method: 'post',
        path: '/',
        handler: (req, res) => serviceController.create(req, res),
      },
      {
        method: 'put',
        path: '/:id',
        handler: (req, res) => serviceController.update(req, res),
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
];

// Build grouped routes
buildGroupedRoutes(router, adminRouteGroups);

export default router;
