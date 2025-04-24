import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import productReducer from './slices/productSlice';
import shopReducer from "./slices/shopSlice";
import kycRequestsReducer from './slices/kycRequestsSlice';
import farmersReducer from './slices/farmerSlice';
import adminReducer from './slices/adminSlice';
import cartReducer from './slices/cartSlice';
import requestOrderReducer from './slices/requestOrderSlice';
import reviewReducer from './slices/reviewSlice';
import customerReducer from './slices/customerSlice';
import siteDetailsReducer from './slices/siteDeatilsSlice';
import bannersReducer from './slices/bannersSlice';
import blogCategoryReducer from './slices/blogCategorySlice';
import blogsReducer from './slices/blogSlice'
import redeemProductsReducer from './slices/redeemProductSlice';
import adminMessageReducer from './slices/adminMessageSlice';
import farmingTipsReducer from './slices/farmingTipsSlice';
import customerRedeemProductReducer from './slices/customerRedeemProductSlice';
import customerHelpSupportReducer from './slices/customerHelpSupportSlice'


const store = configureStore({

  reducer: {

    admins: adminReducer,
    categories: categoryReducer,
    products: productReducer,
    shop: shopReducer,
    kycRequests: kycRequestsReducer,
    farmers: farmersReducer,
    cart: cartReducer,
    requestOrder: requestOrderReducer,
    reviews: reviewReducer,
    customer: customerReducer,
    siteDetails: siteDetailsReducer,
    banners: bannersReducer,
    blogCategory: blogCategoryReducer,
    blogs : blogsReducer,
    redeemProducts: redeemProductsReducer,
    adminMessages: adminMessageReducer,
    farmingTips: farmingTipsReducer,
    customerRedeemProducts: customerRedeemProductReducer,
    customerHelpSupport: customerHelpSupportReducer
  },

});


export default store;
