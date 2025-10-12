import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './redux/store';

/**
 * Typed Redux Hooks
 * Pre-typed versions of useDispatch and useSelector for TypeScript
 *
 * Benefits:
 * - Type-safe state selection
 * - Type-safe dispatch actions
 * - Autocomplete in IDE
 * - No need to type hooks in every component
 */

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
