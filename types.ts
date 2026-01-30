
export interface Message {
  role: 'user' | 'assistant';
  content: string;
  image?: string;
}

export interface CropData {
  name: string;
  price: number;
  yield: number;
  date: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
}
