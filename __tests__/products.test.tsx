import Products from '@/pages/products/';
import { PullStateInstance } from '@/pullstate.core';
import { render, screen } from '@testing-library/react';

describe('Products Page', () => {
  jest.mock('@/pullstate.core', () => ({
    PullStateCore: {
      instantiate: jest.fn().mockReturnValue({
        productList: {
          results: new Array(16).fill(undefined).map((_, id) => ({
            created_at: '2023-12-29T10:41:14Z',
            updated_at: '2023-12-29T10:41:14Z',
            archived_at: '2023-12-29T10:41:14Z',
            id,
            title: `Product ${id}`,
            description: `Description for product ${id}`,
            status: 'FOR_SALE',
            payment_type: 'UNIQ',
            condition: 'GOOD',
            price: 100,
            is_service: false,
            category: 1,
            owner: 1,
          })),
        },
      }),
    },
  }));

  const snapshot: PullStateInstance = {};

  // Mock the useTranslations hook
  jest.mock('next-intl', () => ({
    useTranslations: () => jest.fn(),
  }));

  it('rendering page', () => {
    render(<Products snapshot={snapshot} />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('product list', () => {
    render(<Products snapshot={snapshot} />);
    const products = screen.getAllByTestId('product-card');
    expect(products).toHaveLength(16);
  });
});
