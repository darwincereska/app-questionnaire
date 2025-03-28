import PocketBase from 'pocketbase'
import { PB_URL } from '@/app/consts'
const pb = new PocketBase(PB_URL)
export default pb