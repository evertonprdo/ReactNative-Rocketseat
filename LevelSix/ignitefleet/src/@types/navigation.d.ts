import { BSON } from "realm"

export declare global {
	namespace ReactNavigation {
		interface RootParamList {
			home: undefined
			departure: undefined
			arrival: {
				id: string
			}
		}
	}
}