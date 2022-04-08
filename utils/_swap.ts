export const swap = (arr: any[], index: number, swap: number) => {
	[arr[index], arr[swap]] = [arr[swap], arr[index]];
};
