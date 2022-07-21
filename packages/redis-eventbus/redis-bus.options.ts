export interface RedisBusOptions {
	subUrl: string,
	subChannel: string,
	pubUrl?: string,
	pubChannel?: string
}