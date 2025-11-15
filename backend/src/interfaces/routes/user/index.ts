import { Router } from 'express';
import { buildGroupedRoutes, RouteGroup } from '../../../shared/utils/routeBuilder';
import { ServiceController } from '../../controllers/service.controller';
import { ServiceService } from '../../../application/services/ServiceService';
import { ServiceRepository } from '../../../infrastructure/repositories/ServiceRepository';

const router = Router();

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

// Define user route groups
const userRouteGroups: RouteGroup[] = [
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
    basePath: '/orders',
    routes: [
      {
        method: 'post',
        path: '/',
        handler: (req, res) => orderController.createOrder(req, res),
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
];

// Build grouped routes
buildGroupedRoutes(router, userRouteGroups);

export default router;
