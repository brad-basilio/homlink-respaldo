<?php

use App\Http\Controllers\AdController;
use App\Http\Controllers\BannerMediaController;
use App\Http\Controllers\PaymentMethodMediaController;
use Illuminate\Support\Facades\Route;

// Admin
use App\Http\Controllers\Admin\AboutusController as AdminAboutusController;
use App\Http\Controllers\Admin\IndicatorController as AdminIndicatorController;
use App\Http\Controllers\Admin\MessageController as AdminMessageController;
use App\Http\Controllers\Admin\AppointmentController as AdminAppointmentController;
use App\Http\Controllers\Admin\SliderController as AdminSliderController;
use App\Http\Controllers\Admin\TestimonyController as AdminTestimonyController;
use App\Http\Controllers\Admin\LandingHomeController as AdminLandingHomeController;
use App\Http\Controllers\Admin\ServiceController as AdminServiceController;
use App\Http\Controllers\Admin\PropertyController as AdminPropertyController;
use App\Http\Controllers\Admin\SolutionController as AdminSolutionController;
use App\Http\Controllers\Admin\PurchaseOptionController as AdminPurchaseOptionController;
use App\Http\Controllers\Admin\FacilityController as AdminFacilityController;

use App\Http\Controllers\Admin\SuccessStoryController as AdminSuccessStoryController;

use App\Http\Controllers\Admin\StaffController as AdminStaffController;
use App\Http\Controllers\Admin\SpecialityController as AdminSpecialityController;
use App\Http\Controllers\Admin\LangController as AdminLangController;
use App\Http\Controllers\Admin\SubscriptionController as AdminSubscriptionController;
use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\InfoproductCategoryController as AdminInfoproductCategoryController;
use App\Http\Controllers\Admin\CategoryServiceController as AdminCategoryServiceControllerController;
use App\Http\Controllers\Admin\CategorySolutionController as AdminCategorySolutionControllerController;
use App\Http\Controllers\Admin\CategoryPurcharseOptionController as AdminCategoryPurcharseOptionController;
use App\Http\Controllers\Admin\ComplaintController as AdminComplaintController;
use App\Http\Controllers\Admin\PostController as AdminPostController;
use App\Http\Controllers\Admin\InfoproductController as AdminInfoproductController;
use App\Http\Controllers\Admin\SocialController as AdminSocialController;
use App\Http\Controllers\Admin\TranslationController as AdminTranslationController;
use App\Http\Controllers\Admin\StrengthController as AdminStrengthController;
use App\Http\Controllers\Admin\CoreValueController as AdminCoreValueController;
use App\Http\Controllers\Admin\BenefitController as AdminBenefitController;
use App\Http\Controllers\Admin\GeneralController as AdminGeneralController;
use App\Http\Controllers\Admin\ProfileController as AdminProfileController;
use App\Http\Controllers\Admin\AccountController as AdminAccountController;
use App\Http\Controllers\Admin\AdController as AdminAdController;
use App\Http\Controllers\Admin\BannerController as AdminBannerController;
use App\Http\Controllers\Admin\PaymentMethodController as AdminPaymentMethodController;
use App\Http\Controllers\Admin\BundleController as AdminBundleController;
use App\Http\Controllers\Admin\ItemColorController as AdminItemColorController;
use App\Http\Controllers\Admin\InstagramPostController as AdminInstagramPostsController;
use App\Http\Controllers\Admin\ItemSizeController as AdminItemSizeController;
use App\Http\Controllers\Admin\CouponController as AdminCouponController;
use App\Http\Controllers\FacilityController;
use App\Http\Controllers\Admin\FaqController as AdminFaqController;
use App\Http\Controllers\Admin\FormulaController as AdminFormulaController;
use App\Http\Controllers\Admin\FragranceController as AdminFragranceController;
use App\Http\Controllers\Admin\ItemController as AdminItemController;
use App\Http\Controllers\Admin\RenewalController as AdminRenewalController;
use App\Http\Controllers\Admin\SaleController as AdminSaleController;
use App\Http\Controllers\Admin\SaleStatusController as AdminSaleStatusController;
use App\Http\Controllers\Admin\BrandController as AdminBrandController;
use App\Http\Controllers\Admin\SupplyController as AdminSupplyController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Admin\AppController as AdminAppController;
use App\Http\Controllers\AppMediaController;

// Customer
use App\Http\Controllers\Customer\UserFormulasController as CustomerUserFormulasController;
use App\Http\Controllers\Customer\ProfileController as CustomerProfileController;
use App\Http\Controllers\Customer\SaleController as CustomerSaleController;

// Public
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\CoreValueController;
use App\Http\Controllers\BenefitController;
use App\Http\Controllers\ItemColorController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\CoverController;
use App\Http\Controllers\CulqiController;
use App\Http\Controllers\FragranceController;
use App\Http\Controllers\GeneralController;
use App\Http\Controllers\IndicatorController;
use App\Http\Controllers\InstagramPostsController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ItemImageController;
use App\Http\Controllers\LandingHomeController;
use App\Http\Controllers\MailingController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\InfoproductController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\SolutionController;
use App\Http\Controllers\PurchaseOptionController;
use App\Http\Controllers\SpecialityController;
use App\Http\Controllers\LangController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\StrengthController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\SupplyController;
use App\Http\Controllers\TestimonyController;
use App\Http\Controllers\UserFormulasController;

use App\Http\Controllers\BrandController;
use App\Http\Controllers\SuccessStoryController;
use App\Models\InstagramPost;
use App\Models\PurchaseOption;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
/*NUEVOS */


Route::get('/translations/{lang_id}', [AdminTranslationController::class, 'getByLang']);

// Rutas públicas para banners
Route::get('/banners', function() {
    return \App\Models\Banner::active()->ordered()->get();
});
Route::get('/banners/by-section/{section}', function($section) {
    return \App\Models\Banner::active()->bySection($section)->ordered()->get();
});
Route::get('/banners/by-position/{section}/{position}', function($section, $position) {
    return \App\Models\Banner::active()->bySection($section)->byPosition($position)->ordered()->get();
});

// Rutas públicas para métodos de pago
Route::get('/payment-methods', function() {
    return \App\Models\PaymentMethod::active()->visible()->ordered()->get();
});
Route::get('/payment-methods/by-type/{type}', function($type) {
    return \App\Models\PaymentMethod::active()->visible()->byType($type)->ordered()->get();
});
Route::get('/payment-methods/immediate-10min', function() {
    return \App\Models\PaymentMethod::active()->visible()->immediate10Min()->ordered()->get();
});
Route::get('/payment-methods/immediate-24h', function() {
    return \App\Models\PaymentMethod::active()->visible()->immediate24H()->ordered()->get();
});

Route::post('/reclamos', [ComplaintController::class, 'store']);

Route::get('/generals/get-socials', [GeneralController::class, 'getSocials']);
Route::get('/generals/get-apps', [GeneralController::class, 'getApps']);
Route::get('/generals/get-languages', [GeneralController::class, 'getLanguages']);
Route::get('/generals/get-benefits', [GeneralController::class, 'getBenefits']);
Route::get('/generals/get-aboutuses', [GeneralController::class, 'getAboutuses']);
Route::get('/generals/get-generals', [GeneralController::class, 'getGenerals']);
Route::get('/generals/get-services', [GeneralController::class, 'getServices']);
Route::get('/generals/get-modal', [GeneralController::class, 'getModal']);

Route::get('/items/get-destacados', [ItemController::class, 'getDestacados']);
Route::get('/items/get-testimonies', [TestimonyController::class, 'getTestimonies']);
/*OTROS */
Route::post('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']);
Route::get('/sliders/media/{uuid}', [AdminSliderController::class, 'media']);

Route::get('/landing_home/media/{uuid}', [LandingHomeController::class, 'media']);
Route::get('/landing_home/video/{uuid}', [LandingHomeController::class, 'video']);

Route::get('/service/media/{uuid}', [ServiceController::class, 'media']);

// Rutas públicas para propiedades
Route::get('/properties/public', [AdminPropertyController::class, 'getPublicProperties']);

// Others
Route::get('/solution/media/{uuid}', [SolutionController::class, 'media']);
Route::get('/purchaseOption/media/{uuid}', [PurchaseOptionController::class, 'media']);
Route::get('/facility/media/{uuid}', [FacilityController::class, 'media']);
Route::get('/indicator/media/{uuid}', [IndicatorController::class, 'media']);
Route::get('/app/media/{uuid}', [AppMediaController::class, 'media']);
Route::get('/testimony/media/{uuid}', [TestimonyController::class, 'media']);
Route::get('/staff/media/{uuid}', [StaffController::class, 'media']);
Route::get('/speciality/media/{uuid}', [SpecialityController::class, 'media']);
Route::get('/lang/media/{uuid}', [LangController::class, 'media']);

Route::get('/success_story/media/{uuid}', [SuccessStoryController::class, 'media']);

Route::get('/posts/media/{uuid}', [PostController::class, 'media']);
Route::get('/infoproducts/media/{uuid}', [InfoproductController::class, 'media']);

Route::get('/items/media/{uuid}', [ItemController::class, 'media']);
Route::get('/item_images/media/{uuid}', [ItemImageController::class, 'media']);
Route::get('/supplies/media/{uuid}', [SupplyController::class, 'media']);
//Route::get('/colors/media/{uuid}', [ColorController::class, 'media']);
Route::get('/instagram_post/media/{uuid}', [InstagramPostsController::class, 'media']);
Route::get('/fragrances/media/{uuid}', [FragranceController::class, 'media']);
Route::get('/ads/media/{uuid}', [AdController::class, 'media']);
Route::get('/ads/today', [AdController::class, 'today']);
Route::get('/banners/media/{uuid}', [BannerMediaController::class, 'media']);
Route::get('/payment-methods/media/{uuid}', [PaymentMethodMediaController::class, 'media']);
Route::get('/strength/media/{uuid}', [StrengthController::class, 'media']);
Route::get('/core_value/media/{uuid}', [CoreValueController::class, 'media']);
Route::get('/benefit/media/{uuid}', [BenefitController::class, 'media']);
Route::get('/instagram_post/media/{uuid}', [InstagramPostsController::class, 'media']);
Route::get('/brands/media/{uuid}', [BrandController::class, 'media']);
Route::get('/brands/media/{uuid}', [BrandController::class, 'media']);
Route::get('/infoproducts/media/{uuid}', [InfoproductController::class, 'media']);

Route::post('/posts/paginate', [PostController::class, 'paginate']);
Route::post('/infoproducts/paginate', [InfoproductController::class, 'paginate']);
Route::post('/items/paginate', [ItemController::class, 'paginate']);
Route::post('/supplies/paginate', [SupplyController::class, 'paginate']);

Route::post('/messages', [MessageController::class, 'save']);
Route::post('/appointments', [MessageController::class, 'save']);
Route::post('/subscriptions', [SubscriptionController::class, 'save']);


Route::get('/cover/{uuid}', [CoverController::class, 'full']);
Route::get('/cover/thumbnail/{uuid}', [CoverController::class, 'thumbnail']);

Route::post('/user-formulas', [UserFormulasController::class, 'save']);

Route::post('/coupons', [CouponController::class, 'save']);
Route::post('/coupons/is-first', [CouponController::class, 'isFirst']);

Route::get('/tc', [App\Http\Controllers\ExchangeRateController::class, 'getExchangeRates']);
Route::get('/tc/cupon/{code}', [App\Http\Controllers\ExchangeRateController::class, 'validateCoupon']);

Route::post('/items/verify-stock', [ItemController::class, 'verifyStock']);



Route::prefix('/culqi')->group(function () {
    Route::post('/order', [CulqiController::class, 'order']);
    Route::post('/token', [CulqiController::class, 'token']);
    Route::post('/webhook', [CulqiController::class, 'webhook']);
});

Route::get('/sales/notify/{code}', [SaleController::class, 'notify']);

Route::middleware('auth')->group(function () {
    Route::delete('logout', [AuthController::class, 'destroy'])
        ->name('logout');

    Route::middleware('can:Admin')->prefix('admin')->group(function () {

        Route::get('/sales/{id}', [AdminSaleController::class, 'get']);
        Route::post('/sales', [AdminSaleController::class, 'save']);
        Route::post('/sales/paginate', [AdminSaleController::class, 'paginate']);
        Route::patch('/sales/status', [AdminSaleController::class, 'status']);
        Route::patch('/sales/{field}', [AdminSaleController::class, 'boolean']);
        Route::delete('/sales/{id}', [AdminSaleController::class, 'delete']);

        Route::get('/sale-statuses/by-sale/{id}', [AdminSaleStatusController::class, 'bySale']);

        // Rutas con validación de imágenes
        Route::post('/posts', [AdminPostController::class, 'save'])->middleware('validate.image');
        Route::post('/posts/paginate', [AdminPostController::class, 'paginate']);
        Route::patch('/posts/status', [AdminPostController::class, 'status']);
        Route::patch('/posts/{field}', [AdminPostController::class, 'boolean']);
        Route::delete('/posts/{id}', [AdminPostController::class, 'delete']);

        Route::post('/infoproducts', [AdminInfoproductController::class, 'save'])->middleware('validate.image');
        Route::post('/infoproducts/paginate', [AdminInfoproductController::class, 'paginate']);
        Route::patch('/infoproducts/status', [AdminInfoproductController::class, 'status']);
        Route::patch('/infoproducts/{field}', [AdminInfoproductController::class, 'boolean']);
        Route::delete('/infoproducts/{id}', [AdminInfoproductController::class, 'delete']);

        Route::post('/items', [AdminItemController::class, 'save'])->middleware('validate.image');
        Route::post('/items/paginate', [AdminItemController::class, 'paginate']);
        Route::patch('/items/status', [AdminItemController::class, 'status']);
        Route::patch('/items/{field}', [AdminItemController::class, 'boolean']);
        Route::delete('/items/{id}', [AdminItemController::class, 'delete']);


        Route::post('/colors', [AdminItemColorController::class, 'save']);
        Route::post('/colors/paginate', [AdminItemColorController::class, 'paginate']);
        Route::patch('/colors/status', [AdminItemColorController::class, 'status']);
        Route::patch('/colors/{field}', [AdminItemColorController::class, 'boolean']);
        Route::delete('/colors/{id}', [AdminItemColorController::class, 'delete']);

        Route::post('/instagram_posts', [AdminInstagramPostsController::class, 'save']);
        Route::post('/instagram_posts/paginate', [AdminInstagramPostsController::class, 'paginate']);
        Route::patch('/instagram_posts/status', [AdminInstagramPostsController::class, 'status']);
        Route::patch('/instagram_posts/{field}', [AdminInstagramPostsController::class, 'boolean']);
        Route::delete('/instagram_posts/{id}', [AdminInstagramPostsController::class, 'delete']);

        Route::post('/sizes', [AdminItemSizeController::class, 'save']);
        Route::post('/sizes/paginate', [AdminItemSizeController::class, 'paginate']);
        Route::patch('/sizes/status', [AdminItemSizeController::class, 'status']);
        Route::patch('/sizes/{field}', [AdminItemSizeController::class, 'boolean']);
        Route::delete('/sizes/{id}', [AdminItemSizeController::class, 'delete']);

        Route::post('/supplies', [AdminSupplyController::class, 'save']);
        Route::post('/supplies/paginate', [AdminSupplyController::class, 'paginate']);
        Route::patch('/supplies/status', [AdminSupplyController::class, 'status']);
        Route::patch('/supplies/{field}', [AdminSupplyController::class, 'boolean']);
        Route::delete('/supplies/{id}', [AdminSupplyController::class, 'delete']);

        Route::post('/formulas', [AdminFormulaController::class, 'save']);
        Route::post('/formulas/paginate', [AdminFormulaController::class, 'paginate']);
        Route::patch('/formulas/status', [AdminFormulaController::class, 'status']);
        Route::patch('/formulas/{field}', [AdminFormulaController::class, 'boolean']);
        Route::delete('/formulas/{id}', [AdminFormulaController::class, 'delete']);

        Route::post('/fragrances', [AdminFragranceController::class, 'save']);
        Route::post('/fragrances/paginate', [AdminFragranceController::class, 'paginate']);
        Route::patch('/fragrances/status', [AdminFragranceController::class, 'status']);
        Route::patch('/fragrances/{field}', [AdminFragranceController::class, 'boolean']);
        Route::delete('/fragrances/{id}', [AdminFragranceController::class, 'delete']);

        Route::post('/ads', [AdminAdController::class, 'save']);
        Route::post('/ads/paginate', [AdminAdController::class, 'paginate']);
        Route::patch('/ads/status', [AdminAdController::class, 'status']);
        Route::patch('/ads/{field}', [AdminAdController::class, 'boolean']);
        Route::delete('/ads/{id}', [AdminAdController::class, 'delete']);

        Route::post('/banners', [AdminBannerController::class, 'save'])->middleware('validate.image');
        Route::post('/banners/paginate', [AdminBannerController::class, 'paginate']);
        Route::patch('/banners/status', [AdminBannerController::class, 'status']);
        Route::patch('/banners/{field}', [AdminBannerController::class, 'boolean']);
        Route::delete('/banners/{id}', [AdminBannerController::class, 'delete']);

        Route::post('/payment-methods', [AdminPaymentMethodController::class, 'save']);
        Route::post('/payment-methods/paginate', [AdminPaymentMethodController::class, 'paginate']);
        Route::patch('/payment-methods/status', [AdminPaymentMethodController::class, 'status']);
        Route::patch('/payment-methods/{field}', [AdminPaymentMethodController::class, 'boolean']);
        Route::delete('/payment-methods/{id}', [AdminPaymentMethodController::class, 'delete']);

        Route::post('/renewals', [AdminRenewalController::class, 'save']);
        Route::post('/renewals/paginate', [AdminRenewalController::class, 'paginate']);
        Route::patch('/renewals/status', [AdminRenewalController::class, 'status']);
        Route::patch('/renewals/{field}', [AdminRenewalController::class, 'boolean']);
        Route::delete('/renewals/{id}', [AdminRenewalController::class, 'delete']);

        Route::post('/bundles', [AdminBundleController::class, 'save']);
        Route::post('/bundles/paginate', [AdminBundleController::class, 'paginate']);
        Route::patch('/bundles/status', [AdminBundleController::class, 'status']);
        Route::patch('/bundles/{field}', [AdminBundleController::class, 'boolean']);
        Route::delete('/bundles/{id}', [AdminBundleController::class, 'delete']);

        Route::post('/coupons', [AdminCouponController::class, 'save']);
        Route::post('/coupons/paginate', [AdminCouponController::class, 'paginate']);
        Route::patch('/coupons/status', [AdminCouponController::class, 'status']);
        Route::patch('/coupons/{field}', [AdminCouponController::class, 'boolean']);
        Route::delete('/coupons/{id}', [AdminCouponController::class, 'delete']);

        Route::post('/messages', [AdminMessageController::class, 'save']);
        Route::post('/messages/paginate', [AdminMessageController::class, 'paginate']);
        Route::patch('/messages/status', [AdminMessageController::class, 'status']);
        Route::patch('/messages/{field}', [AdminMessageController::class, 'boolean']);
        Route::delete('/messages/{id}', [AdminMessageController::class, 'delete']);

        Route::post('/appointments', [AdminAppointmentController::class, 'save']);
        Route::post('/appointments/paginate', [AdminAppointmentController::class, 'paginate']);
        Route::patch('/appointments/status', [AdminAppointmentController::class, 'status']);
        Route::patch('/appointments/{field}', [AdminAppointmentController::class, 'boolean']);
        Route::delete('/appointments/{id}', [AdminAppointmentController::class, 'delete']);


         Route::post('/success_stories', [AdminSuccessStoryController::class, 'save']);
        Route::post('/success_stories/paginate', [AdminSuccessStoryController::class, 'paginate']);
        Route::patch('/success_stories/status', [AdminSuccessStoryController::class, 'status']);
        Route::patch('/success_stories/{field}', [AdminSuccessStoryController::class, 'boolean']);
        Route::delete('/success_stories/{id}', [AdminSuccessStoryController::class, 'delete']);

        Route::post('/subscriptions/paginate', [AdminSubscriptionController::class, 'paginate']);
        Route::patch('/subscriptions/status', [AdminSubscriptionController::class, 'status']);
        Route::delete('/subscriptions/{id}', [AdminSubscriptionController::class, 'delete']);

        Route::post('/aboutus', [AdminAboutusController::class, 'save']);
        Route::post('/aboutus/paginate', [AdminAboutusController::class, 'paginate']);
        Route::patch('/aboutus/status', [AdminAboutusController::class, 'status']);
        Route::patch('/aboutus/{field}', [AdminAboutusController::class, 'boolean']);
        Route::delete('/aboutus/{id}', [AdminAboutusController::class, 'delete']);

        Route::post('/indicators', [AdminIndicatorController::class, 'save']);
        Route::post('/indicators/paginate', [AdminIndicatorController::class, 'paginate']);
        Route::patch('/indicators/status', [AdminIndicatorController::class, 'status']);
        Route::patch('/indicators/{field}', [AdminIndicatorController::class, 'boolean']);
        Route::delete('/indicators/{id}', [AdminIndicatorController::class, 'delete']);

        Route::post('/apps', [AdminAppController::class, 'save']);
        Route::post('/apps/paginate', [AdminAppController::class, 'paginate']);
        Route::patch('/apps/status', [AdminAppController::class, 'status']);
        Route::patch('/apps/{field}', [AdminAppController::class, 'boolean']);
        Route::delete('/apps/{id}', [AdminAppController::class, 'delete']);

        Route::post('/sliders', [AdminSliderController::class, 'save'])->middleware('validate.image');
        Route::post('/sliders/paginate', [AdminSliderController::class, 'paginate']);
        Route::patch('/sliders/status', [AdminSliderController::class, 'status']);
        Route::patch('/sliders/{field}', [AdminSliderController::class, 'boolean']);
        Route::delete('/sliders/{id}', [AdminSliderController::class, 'delete']);

        Route::post('/testimonies', [AdminTestimonyController::class, 'save'])->middleware('validate.image');
        Route::post('/testimonies/paginate', [AdminTestimonyController::class, 'paginate']);
        Route::patch('/testimonies/status', [AdminTestimonyController::class, 'status']);
        Route::patch('/testimonies/{field}', [AdminTestimonyController::class, 'boolean']);
        Route::delete('/testimonies/{id}', [AdminTestimonyController::class, 'delete']);

        Route::post('/categories', [AdminCategoryController::class, 'save'])->middleware('validate.image');
        Route::post('/categories/paginate', [AdminCategoryController::class, 'paginate']);
        Route::patch('/categories/status', [AdminCategoryController::class, 'status']);
        Route::patch('/categories/{field}', [AdminCategoryController::class, 'boolean']);
        Route::delete('/categories/{id}', [AdminCategoryController::class, 'delete']);

        Route::post('/infoproductcategories', [AdminInfoproductCategoryController::class, 'save'])->middleware('validate.image');
        Route::post('/infoproductcategories/paginate', [AdminInfoproductCategoryController::class, 'paginate']);
        Route::patch('/infoproductcategories/status', [AdminInfoproductCategoryController::class, 'status']);
        Route::patch('/infoproductcategories/{field}', [AdminInfoproductCategoryController::class, 'boolean']);
        Route::delete('/infoproductcategories/{id}', [AdminInfoproductCategoryController::class, 'delete']);


        Route::post('/category_services/paginate', [AdminCategoryServiceControllerController::class, 'paginate']);
        Route::post('/category_solutions/paginate', [AdminCategorySolutionControllerController::class, 'paginate']);
        Route::post('/category_purcharse_options/paginate', [AdminCategoryPurcharseOptionController::class, 'paginate']);

        Route::post('/complaints', [AdminComplaintController::class, 'save']);
        Route::post('/complaints/paginate', [AdminComplaintController::class, 'paginate']);
        Route::patch('/complaints/status', [AdminComplaintController::class, 'status']);
        Route::patch('/complaints/{field}', [AdminComplaintController::class, 'boolean']);
        Route::delete('/complaints/{id}', [AdminComplaintController::class, 'delete']);

        Route::get('/complaints/{id}/attachments', [AdminComplaintController::class, 'attachments']);
        Route::patch('/complaints/{id}/update-estado', [AdminComplaintController::class, 'updateEstado']);

        Route::post('/brands', [AdminBrandController::class, 'save'])->middleware('validate.image');
        Route::post('/brands/paginate', [AdminBrandController::class, 'paginate']);
        Route::patch('/brands/status', [AdminBrandController::class, 'status']);
        Route::patch('/brands/{field}', [AdminBrandController::class, 'boolean']);
        Route::delete('/brands/{id}', [AdminBrandController::class, 'delete']);



        Route::post('/faqs', [AdminFaqController::class, 'save']);
        Route::post('/faqs/paginate', [AdminFaqController::class, 'paginate']);
        Route::patch('/faqs/status', [AdminFaqController::class, 'status']);
        Route::patch('/faqs/{field}', [AdminFaqController::class, 'boolean']);
        Route::delete('/faqs/{id}', [AdminFaqController::class, 'delete']);

        Route::post('/strengths', [AdminStrengthController::class, 'save'])->middleware('validate.image');
        Route::post('/strengths/paginate', [AdminStrengthController::class, 'paginate']);
        Route::patch('/strengths/status', [AdminStrengthController::class, 'status']);
        Route::patch('/strengths/{field}', [AdminStrengthController::class, 'boolean']);
        Route::delete('/strengths/{id}', [AdminStrengthController::class, 'delete']);

        Route::post('/core_values', [AdminCoreValueController::class, 'save'])->middleware('validate.image');
        Route::post('/core_values/paginate', [AdminCoreValueController::class, 'paginate']);
        Route::patch('/core_values/status', [AdminCoreValueController::class, 'status']);
        Route::patch('/core_values/{field}', [AdminCoreValueController::class, 'boolean']);
        Route::delete('/core_values/{id}', [AdminCoreValueController::class, 'delete']);

        Route::post('/benefits', [AdminBenefitController::class, 'save'])->middleware('validate.image');
        Route::post('/benefits/paginate', [AdminBenefitController::class, 'paginate']);
        Route::patch('/benefits/status', [AdminBenefitController::class, 'status']);
        Route::patch('/benefits/{field}', [AdminBenefitController::class, 'boolean']);
        Route::delete('/benefits/{id}', [AdminBenefitController::class, 'delete']);

        Route::post('/socials', [AdminSocialController::class, 'save']);
        Route::post('/socials/paginate', [AdminSocialController::class, 'paginate']);
        Route::patch('/socials/status', [AdminSocialController::class, 'status']);
        Route::patch('/socials/{field}', [AdminSocialController::class, 'boolean']);
        Route::delete('/socials/{id}', [AdminSocialController::class, 'delete']);

        Route::post('/translations', [AdminTranslationController::class, 'save']);
        Route::post('/translations/paginate', [AdminTranslationController::class, 'paginate']);
        Route::patch('/translations/status', [AdminTranslationController::class, 'status']);
        Route::patch('/translations/{field}', [AdminTranslationController::class, 'boolean']);
        Route::delete('/translations/{id}', [AdminTranslationController::class, 'delete']);
        Route::post('/translations/translate', [AdminTranslationController::class, 'translate']);

        Route::post('/generals', [AdminGeneralController::class, 'save']);
        Route::post('/generals/paginate', [AdminGeneralController::class, 'paginate']);
        Route::patch('/generals/status', [AdminGeneralController::class, 'status']);
        Route::patch('/generals/{field}', [AdminGeneralController::class, 'boolean']);
        Route::delete('/generals/{id}', [AdminGeneralController::class, 'delete']);

        Route::post('/users', [AdminUserController::class, 'save'])->middleware('validate.image');
        Route::post('/users/paginate', [AdminUserController::class, 'paginate']);
        Route::patch('/users/status', [AdminUserController::class, 'status']);
        Route::patch('/users/{field}', [AdminUserController::class, 'boolean']);
        Route::delete('/users/{id}', [AdminUserController::class, 'delete']);

        Route::get('/profile/{uuid}', [AdminProfileController::class, 'full']);
        Route::get('/profile/thumbnail/{uuid}', [AdminProfileController::class, 'thumbnail']);
        Route::post('/profile', [AdminProfileController::class, 'saveProfile'])->middleware('validate.image');
        Route::patch('/profile', [AdminProfileController::class, 'save'])->middleware('validate.image');

        Route::patch('/account/email', [AdminAccountController::class, 'email']);
        Route::patch('/account/password', [AdminAccountController::class, 'password']);

        /*NO PAIN LINKS */

        Route::post('/landing_home', [AdminLandingHomeController::class, 'save']);
        Route::post('/landing_home/paginate', [AdminLandingHomeController::class, 'paginate']);
        Route::patch('/landing_home/status', [AdminLandingHomeController::class, 'status']);
        Route::patch('/landing_home/{field}', [AdminLandingHomeController::class, 'boolean']);
        Route::delete('/landing_home/{id}', [AdminLandingHomeController::class, 'delete']);
        Route::post('/landing_home/translate', [AdminLandingHomeController::class, 'translate']);
        Route::get('/landing_home/by_lang/{langId}', [AdminLandingHomeController::class, 'getByLang']);

        Route::post('/services', [AdminServiceController::class, 'save']);
        Route::post('/services/paginate', [AdminServiceController::class, 'paginate']);
        Route::patch('/services/status', [AdminServiceController::class, 'status']);
        Route::patch('/services/{field}', [AdminServiceController::class, 'boolean']);
        Route::delete('/services/{id}', [AdminServiceController::class, 'delete']);

        Route::post('/properties', [AdminPropertyController::class, 'save']);
        Route::post('/properties/paginate', [AdminPropertyController::class, 'paginate']);
        Route::patch('/properties/status', [AdminPropertyController::class, 'status']);
        Route::patch('/properties/{field}', [AdminPropertyController::class, 'boolean']);
        Route::delete('/properties/{id}', [AdminPropertyController::class, 'delete']);

        Route::post('/solutions', [AdminSolutionController::class, 'save']);
        Route::post('/solutions/paginate', [AdminSolutionController::class, 'paginate']);
        Route::patch('/solutions/status', [AdminSolutionController::class, 'status']);
        Route::patch('/solutions/{field}', [AdminSolutionController::class, 'boolean']);
        Route::delete('/solutions/{id}', [AdminSolutionController::class, 'delete']);

        Route::post('/purchaseOptions', [AdminPurchaseOptionController::class, 'save']);
        Route::post('/purchaseOptions/paginate', [AdminPurchaseOptionController::class, 'paginate']);
        Route::patch('/purchaseOptions/status', [AdminPurchaseOptionController::class, 'status']);
        Route::patch('/purchaseOptions/{field}', [AdminPurchaseOptionController::class, 'boolean']);
        Route::delete('/purchaseOptions/{id}', [AdminPurchaseOptionController::class, 'delete']);

        Route::post('/facilities', [AdminFacilityController::class, 'save']);
        Route::post('/facilities/paginate', [AdminFacilityController::class, 'paginate']);
        Route::patch('/facilities/status', [AdminFacilityController::class, 'status']);
        Route::patch('/facilities/{field}', [AdminFacilityController::class, 'boolean']);
        Route::delete('/facilities/{id}', [AdminFacilityController::class, 'delete']);

        Route::post('/staff', [AdminStaffController::class, 'save']);
        Route::post('/staff/paginate', [AdminStaffController::class, 'paginate']);
        Route::patch('/staff/status', [AdminStaffController::class, 'status']);
        Route::patch('/staff/{field}', [AdminStaffController::class, 'boolean']);
        Route::delete('/staff/{id}', [AdminStaffController::class, 'delete']);

        Route::post('/specialities', [AdminSpecialityController::class, 'save']);
        Route::post('/specialities/paginate', [AdminSpecialityController::class, 'paginate']);
        Route::patch('/specialities/status', [AdminSpecialityController::class, 'status']);
        Route::patch('/specialities/{field}', [AdminSpecialityController::class, 'boolean']);
        Route::delete('/specialities/{id}', [AdminSpecialityController::class, 'delete']);

        Route::post('/langs', [AdminLangController::class, 'save']);
        Route::post('/langs/paginate', [AdminLangController::class, 'paginate']);
        Route::patch('/langs/status', [AdminLangController::class, 'status']);
        Route::patch('/langs/{field}', [AdminLangController::class, 'boolean']);
        Route::delete('/langs/{id}', [AdminLangController::class, 'delete']);
    });

    // Endpoint para obtener variables de notificaciones
    Route::get('/notification-variables/{type}', function ($type) {
        $notificationClasses = [
            'message_contact' => \App\Notifications\MessageContactNotification::class,
            'admin_contact_notification' => \App\Notifications\AdminContactNotification::class,
            'purchase_summary' => \App\Notifications\PurchaseSummaryNotification::class,
            'order_status_changed' => \App\Notifications\OrderStatusChangedNotification::class,
            'blog_published' => \App\Notifications\BlogPublishedNotification::class,
            'claim' => \App\Notifications\ClaimNotification::class,
            'password_changed' => \App\Notifications\PasswordChangedNotification::class,
            'password_reset' => \App\Notifications\PasswordResetLinkNotification::class,
            'subscription' => \App\Notifications\SubscriptionNotification::class,
            'verify_account' => \App\Notifications\VerifyAccountNotification::class,
        ];

        if (!isset($notificationClasses[$type])) {
            return response()->json(['error' => 'Invalid notification type'], 400);
        }

        $class = $notificationClasses[$type];
        if (!method_exists($class, 'availableVariables')) {
            return response()->json(['variables' => []], 200);
        }

        return response()->json(['variables' => $class::availableVariables()], 200);
    });

    Route::middleware('can:Customer')->prefix('customer')->group(function () {

        Route::get('/sales/{id}', [CustomerSaleController::class, 'get']);
        Route::post('/sales/paginate', [CustomerSaleController::class, 'paginate']);
        Route::delete('/sales/{id}', [CustomerSaleController::class, 'delete']);

        Route::post('/user-formulas', [CustomerUserFormulasController::class, 'save']);
        Route::patch('/profile', [CustomerProfileController::class, 'save']);
    });
});
