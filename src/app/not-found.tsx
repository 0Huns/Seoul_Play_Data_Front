import { Metadata } from 'next';
import ErrorCP from '@/component/common/ErrorCP';

export const metadata: Metadata = {
  title: '404 - 페이지를 찾을 수 없습니다',
  description: '요청하신 페이지를 찾을 수 없습니다.',
  robots: 'noindex',
};

export default function ErrorPage() {
  return <ErrorCP />;
}
