// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import React from 'react';
import { render, screen } from '@testing-library/react';

import { defaultStatusTitles, UserIcon, UserIconStatus } from './UserIcon';

function assertBaseElements(size = 'small', backgroundColor = 'white') {
  const userIconContainer = screen.getByTitle('Terry Rivers');
  expect(userIconContainer.className).toEqual(`iui-user-icons-${size}`);

  const abbreviation = screen.getByText('TR');
  expect(abbreviation.className).toEqual('iui-user-icons-initials');
  expect(abbreviation.style.backgroundColor).toEqual(backgroundColor);
}

it('should render with given abbreviation', () => {
  render(<UserIcon abbreviation='TR' title='Terry Rivers' />);
  assertBaseElements();
});

it('should render with given abbreviation (longer than 2 chars)', () => {
  render(<UserIcon abbreviation='TRivers' title='Terry Rivers' />);
  assertBaseElements();
});

it.each(['small', 'medium', 'large', 'x-large'] as Array<
  'small' | 'medium' | 'large' | 'x-large'
>)('should render with %s size', (size) => {
  render(<UserIcon abbreviation='TR' title='Terry Rivers' size={size} />);
  assertBaseElements(size);
});

it.each(['', 'online', 'busy', 'away', 'offline'] as Array<UserIconStatus>)(
  'should render with the %s status',
  (status) => {
    const { container } = render(
      <UserIcon abbreviation='TR' title='Terry Rivers' status={status} />,
    );
    assertBaseElements();
    const statusContainer = container.querySelector(
      '.iui-user-icons-status',
    ) as HTMLElement;
    if (!status) {
      expect(statusContainer).toBeFalsy();
      return;
    }
    expect(statusContainer).toBeTruthy();
    expect(statusContainer.classList).toContain(`iui-${status}`);
    expect(statusContainer.getAttribute('title')).toEqual(
      defaultStatusTitles[status],
    );
  },
);

it('should render with translated statuses', () => {
  const { container } = render(
    <UserIcon
      abbreviation='TR'
      title='Terry Rivers'
      status='offline'
      translatedStatusTitles={{
        ...defaultStatusTitles,
        offline: 'test-offline',
      }}
    />,
  );

  const statusContainer = container.querySelector(
    '.iui-user-icons-status',
  ) as HTMLElement;
  expect(statusContainer.getAttribute('title')).toEqual('test-offline');
});

it('should render with custom color', () => {
  render(
    <UserIcon
      abbreviation='TR'
      title='Terry Rivers'
      backgroundColor={'pink'}
    />,
  );
  assertBaseElements(undefined, 'pink');
});

it('renders with image', () => {
  const { container } = render(
    <UserIcon image={<img />} title='Terry Rivers' />,
  );

  const userIconContainer = screen.getByTitle('Terry Rivers');
  expect(userIconContainer.className).toEqual('iui-user-icons-small');
  const abbreviation = container.querySelector('.iui-user-icons-initials');
  expect(abbreviation).toBeFalsy();
  const img = container.querySelector('img');
  expect(img).toBeTruthy();
});

it('should render with custom className', () => {
  const { container } = render(
    <UserIcon
      abbreviation='TR'
      title='Terry Rivers'
      className='test-classname'
    />,
  );

  const userIconContainer = container.querySelector('.test-classname');
  expect(userIconContainer).toBeTruthy();
});
