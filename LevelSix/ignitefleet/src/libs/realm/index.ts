import { createRealmContext, Realm } from "@realm/react"
import { SyncConfiguration } from "realm";
import { Historic } from "./schemas/Historic";


const realmAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
	type: Realm.OpenRealmBehaviorType.OpenImmediately
}

export const syncConfig: Partial<SyncConfiguration> = {
	flexible: true,
	newRealmFileBehavior: realmAccessBehavior,
	existingRealmFileBehavior: realmAccessBehavior,

	initialSubscriptions: {
		update(mutableSubs, realm) {
			const historicByUserQuery = realm.objects('Historic')
			mutableSubs.add(historicByUserQuery, { name: 'historic' })
		},
		rerunOnOpen: true,
	},
}

export const {
	RealmProvider,
	useRealm,
	useQuery,
	useObject
} = createRealmContext({
	schema: [Historic]
});