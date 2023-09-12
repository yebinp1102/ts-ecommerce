import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/Product";
import axios from "axios";
import { ApiError } from "../../types/ApiError";
import { getError } from "../../utils";

interface ProductState {
  products: Product[],
  loading: boolean,
  error: boolean,
  message: string,
  product : Product
}

const initialState :ProductState = {
  products : [],
  loading: false,
  error: false,
  message: '',
  product : {
    name: '',
    slug: '',
    image: '',
    category: '',
    brand: '',
    price: 0,
    countInStock: 0,
    description: '',
    rating: 0,
    numReviews: 0
  }
}

export const fetchProducts = createAsyncThunk("product/fetch", async() => {
  try{
    const res = await axios.get('/api/products');
    return res.data;
  }catch(err){
    return getError(err as ApiError)
  }
})

export const getProductDetail = createAsyncThunk("product/detail", async(slug: string) => {
  try{
    const res = await axios.get(`/api/products/${slug}`);
    return res.data;
  }catch(err){
    return getError(err as ApiError)
  }
})

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action : PayloadAction<any>) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload
      })
      .addCase(getProductDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductDetail.rejected, (state, action : PayloadAction<any>) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload
      })
  }
})

export default ProductSlice.reducer;
