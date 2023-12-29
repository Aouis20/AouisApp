import Home from '@/pages/';
import { PullStateInstance } from '@/pullstate.core';
import { render, screen } from '@testing-library/react';

// Mock the PullstateCore.instantiate method
jest.mock('@/pullstate.core', () => ({
  PullstateCore: {
    instantiate: jest.fn().mockReturnValue({}),
  },
}));

// Mock the useTranslations hook
jest.mock('next-intl', () => ({
  useTranslations: () => jest.fn(),
}));

describe('rendering page', () => {
  it('Render page', () => {
    const snapshot: PullStateInstance = {};
    render(<Home snapshot={snapshot} />);
    expect(screen.getByText('Aouis Homepage')).toBeInTheDocument();
  });
});
