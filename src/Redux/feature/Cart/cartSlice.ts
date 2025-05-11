import { TCard } from "@/Pages/HomePage/FeaturedProducts/FeaturedProducts";
import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  products: TCard[];
}

const initialState: initialState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
});

export default cartSlice.reducer;
