import { OrderListPipe } from './order-list.pipe';
import * as mockRaw from '../../data/tracks.json'
import { TracksModel } from '@core/models/tracks.model';

describe('OrderListPipe', () => {
  it('create an instance', () => {
    const pipe = new OrderListPipe();
    expect(pipe).toBeTruthy();
  });

  it('Testing input/output values', () => {
    //Arrange
    const pipe = new OrderListPipe();
    const { data }: any = (mockRaw as any).default

    //Act
    const result: TracksModel[] = pipe.transform(data)

    //Assert
    expect(result).toEqual(data)
  })

  it('Testing order list ASC', () => {
    //Arrange
    const pipe = new OrderListPipe()
    const {data}: any = (mockRaw as any).default
    const firstValue = data.find((i: any) => i._id === 7)
    const lastValue = data.find((i: any) => i._id === 6)

    //Act
    const result: TracksModel[] = pipe.transform(data, 'name', 'asc')
    const fistResult = result[0]
    const lastResult = result[result.length - 1]

    //Assert
    expect(fistResult).toEqual(firstValue)
    expect(lastResult).toEqual(lastValue)
  })

  it('Testing order list DESC', () => {
    //Arrange
    const pipe = new OrderListPipe()
    const {data}: any = (mockRaw as any).default
    const firstValue = data.find((i: any) => i._id === 6)
    const lastValue = data.find((i: any) => i._id === 7)

    //Act
    const result: TracksModel[] = pipe.transform(data, 'name', 'asc')
    const fistResult = result[result.length - 1]
    const lastResult = result[0]

    //Assert
    expect(fistResult).toEqual(firstValue)
    expect(lastResult).toEqual(lastValue)
  })
});
