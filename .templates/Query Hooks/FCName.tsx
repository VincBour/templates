import { useQuery } from 'react-query';
import { GET_INITIAL_VALUES } from './queryConstants';

export const [FCName] = () => useQuery(GET_INITIAL_VALUES, getInitialValues());