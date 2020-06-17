import { createAction } from '@reduxjs/toolkit'
import * as actionTypes from '../actionTypes';

export const addStarred = createAction(actionTypes.ADD_STARRED)
export const removeStarred = createAction(actionTypes.REMOVE_STARRED)