import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
    data: {
      message: string;
      stack: string;
      success: boolean;
    };
    status: number;
  };

  export type TBooks = {
    _id : string
    title: string;
    author: string;
    bookImage?: string;
    price: number;
    category: string;
    description: string;
    quantity: number;
    inStock: boolean;
    isDeleted?: boolean;
  };
  
  export type TMeta = {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
  };
  
  export type TResponse<T> = {
    data: T;
    error?: TError;
    meta?: TMeta;
  };
  
  export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;
  
  export type TQueryParams = {
    name: string;
    value: boolean | React.Key;
  };