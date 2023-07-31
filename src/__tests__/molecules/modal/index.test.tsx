import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Modal from '@/components/molecules/Modal';

describe('Modal', () => {
  it('renders Delete modal', () => {
    const component = render(
      <Modal
        variant='danger'
        title='Confirm Delete'
        message='Are you sure you want to delete this product?'
        confirmBtnText='Delete'
        isModalVisible={true}
        onConfirm={() => {
          return;
        }}
        onCancel={() => {
          return;
        }}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
