import { render, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { TYPE_ADD_RESTAURANT } from '../actions/restaurant';
import RestaurantPage from './RestaurantPage';

jest.mock('react-redux');

describe('RestaurantPage', () => {
  useSelector.mockImplementation(() => ({}));

  it('레스토랑의 이름, 분류, 주소 모두 있다면 등록 버튼 클릭시 alert를 호출하지 않습니다.', () => {
    useDispatch.mockImplementation(() => () => {});
    const spy = jest.spyOn(window, 'alert');
    spy.mockImplementation(() => {}); // Error: Not implemented: window.alert를 해결하기 위해
    const sut = render(<RestaurantPage />);

    fireEvent.change(sut.getByLabelText('이름'), { target: { value: 'foo' } });
    fireEvent.change(sut.getByLabelText('분류'), { target: { value: 'foo' } });
    fireEvent.change(sut.getByLabelText('주소'), { target: { value: 'foo' } });
    fireEvent.click(sut.getByRole('button', { name: '등록' }));

    expect(spy).toBeCalledTimes(0);
  });

  it('레스토랑의 이름, 분류, 주소 중 하나 이상이 비어있다면 등록 버튼 클릭시 alert를 호출합니다.', () => {
    useDispatch.mockImplementation(() => () => {});
    const spy = jest.spyOn(window, 'alert');
    spy.mockImplementation(() => {}); // Error: Not implemented: window.alert를 해결하기 위해
    const sut = render(<RestaurantPage />);

    fireEvent.change(sut.getByLabelText('이름'), { target: { value: 'foo' } });
    fireEvent.change(sut.getByLabelText('분류'), { target: { value: 'foo' } });
    fireEvent.click(sut.getByRole('button', { name: '등록' }));

    expect(spy).toBeCalledTimes(1);
  });

  it('레스토랑 정보를 입력하고 등록 버튼을 클릭하면 addRestaurant action이 dispatch됩니다.', () => {
    const mock = jest.fn();
    useDispatch.mockImplementation(() => mock);
    const payload = { name: 'foo', category: 'bar', address: 'baz' };
    const sut = render(<RestaurantPage />);

    fireEvent.change(sut.getByLabelText('이름'), { target: { value: payload.name } });
    fireEvent.change(sut.getByLabelText('분류'), { target: { value: payload.category } });
    fireEvent.change(sut.getByLabelText('주소'), { target: { value: payload.address } });
    fireEvent.click(sut.getByRole('button', { name: '등록' }));

    expect(mock).toBeCalledTimes(1);
    expect(mock).toBeCalledWith(expect.objectContaining({ type: TYPE_ADD_RESTAURANT, payload }));
  });

  it('레스토랑 정보를 입력하고 등록 버튼을 클릭하면 모든 input의 값이 비워집니다.', () => {
    useDispatch.mockImplementation(() => () => {});
    const sut = render(<RestaurantPage />);
    const inputName = sut.getByLabelText('이름');
    const inputCategory = sut.getByLabelText('분류');
    const inputAddress = sut.getByLabelText('주소');

    fireEvent.change(inputName, { target: { value: 'foo' } });
    fireEvent.change(inputCategory, { target: { value: 'foo' } });
    fireEvent.change(inputAddress, { target: { value: 'foo' } });
    fireEvent.click(sut.getByRole('button', { name: '등록' }));

    expect(inputName).toHaveValue('');
    expect(inputCategory).toHaveValue('');
    expect(inputAddress).toHaveValue('');
  });
});