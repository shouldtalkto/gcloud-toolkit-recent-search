// stt db = data represented in stt data models
// analytics = data recorded in bigQuery

const splitUrl = [
	'https://api.twitter.com/2/tweets/search/recent?tweet.fields=id', // stt db
	'text', // stt db
	'author_id', // stt db
	'context_annotations', // analytics
	'conversation_id', // analytics
	'created_at', // stt db
	'entities', // object {}
	'in_reply_to_user_id', // stt db: Referent of "You" in "You should talk to" reply-tweets
	'lang', // stt db
	'possibly_sensitive', // stt db
	'public_metrics', // object { retweet_count, reply_count, like_count, quote_count }
	'referenced_tweets',
	'reply_settings',
	'source', // analytics
	'withheld&expansions=author_id', // Expansions | author's user object
	'referenced_tweets.id', // referenced tweet objects (including previous versions of edited tweet)
	'in_reply_to_user_id', // user object of author of tweet being replied to
	'attachments.poll_ids',
	'entities.mentions.username&poll.fields=duration_minutes',
	'end_datetime',
	'id',
	'options',
	'voting_status&user.fields=created_at',
	'description',
	'entities',
	'id',
	'location',
	'name',
	'pinned_tweet_id',
	'profile_image_url',
	'protected',
	'public_metrics',
	'url',
	'username',
	'verified',
	'withheld',
]

// todo: Add edited

const config = {
	twitter_bearer_token: 'Bearer <<INSERT YOUR BEARER TOKEN>>',
	gcp_projectId: '<<GCP PROJECT ID>>',
	PORT: 4050,
	recent_search_url: splitUrl.join(','),
	bq: {
		table: {
			tweets: 'tweets',
			users: 'users',
			media: 'media',
		},
	},
}

export default config

// Unmodified recent_search_url (from https://github.com/twitterdev/gcloud-toolkit-recent-search):
// 'https://api.twitter.com/2/tweets/search/recent?tweet.fields=id,text,attachments,author_id,context_annotations,conversation_id,created_at,entities,geo,in_reply_to_user_id,lang,possibly_sensitive,public_metrics,referenced_tweets,reply_settings,source,withheld&expansions=author_id,referenced_tweets.id,in_reply_to_user_id,attachments.media_keys,attachments.poll_ids,geo.place_id,entities.mentions.username,referenced_tweets.id.author_id&media.fields=media_key,type,duration_ms,height,preview_image_url,public_metrics,width,alt_text&place.fields=contained_within,country,country_code,full_name,geo,id,name,place_type&poll.fields=duration_minutes,end_datetime,id,options,voting_status&user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld'
