export type Service = {
	id: number;
    name: string,
	description?: string,
    duration: number,
    price: number
};

export type MyCollections = {
	service: Service
};