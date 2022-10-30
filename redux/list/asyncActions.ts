import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Item } from './types';

interface DeleteParams {
  id: number;
}

export const deleteItem = createAsyncThunk<Item, DeleteParams>(
  'contacts/deleteItem',
  async (params) => {
    try {
      const { data } = await axios.delete(
        `https://61a54a844c822c0017042179.mockapi.io/cards/${params.id}`,
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  },
);
