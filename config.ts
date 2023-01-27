// stt * = data represented in stt data models
// _fields = unused but returned in response
// everything else: potentially useful data recorded for analytics purposes; not necessary to stt app funcionality
// todo: add edited to schema, check schema fields for tweet and user

const tweetFields = [
	// stt Tweet.id
	'id',
	// stt Tweet.authorId
	'author_id',
	// stt Tweet.text
	'text',
	// stt Tweet.lang
	'lang',
	// stt Tweet.possiblySensitive
	'possibly_sensitive',
	// stt Tweet.aId or Tweet.bId; referent of the word "You" in "You should talk to" type reply-tweet
	'in_reply_to_user_id',
	// stt Tweet.twCreatedAt
	'created_at',
	// array of ids indicating all versions of a tweet; stt Tweet.edited
	'edit_history_tweet_ids',
	// object: { retweet_count, reply_count, like_count, quote_count }; stt Tweet.retweetCount & Tweet.likeCount; reply_count & quote_count for analytics
	'public_metrics',
	// object: { annotations, _urls, hashtags, _cashtags, mentions }; mentions for user ids (stt Tweet.aId & Tweet.bId); annotations and hashtags for analytics
	'entities',
	// inferred context (domains and entities) based on semantic analysis
	'context_annotations',
	// name of app tweeted from; for analytics
	'source',
]
const userFields = [
	// stt User.id
	'id',
	// stt User.username
	'username',
	// stt User.name
	'name',
	// stt User.profileImageUrl
	'profile_image_url',
	// stt User.description
	'description',
	// stt User.location
	'location',
	// stt User.url
	'url',
	// stt User.verified
	'verified',
	// stt User.verifiedType
	'verified_type',
	// stt User.protected
	'protected',
	// object: { followers_count, following_count, tweet_count, _listed_count }; stt User.followersCount, User.followingCount, User.tweetCount
	'public_metrics',
	// stt User.twCreatedAt
	'created_at',
]

const expansions = [
	// user object of author of tweet
	'author_id',
	// user object of author of tweet being replied to (for "You should talk to" type reply-tweets)
	'in_reply_to_user_id',
	// user objects of mentioned users ("user1 should talk to user2")
	'entities.mentions.username',
	// poll object (currently recorded but unused)
	'attachments.poll_ids',
]

// todo: parse poll data and incorporate into campaign scores
const pollFields = [
	'id',
	'end_datetime',
	'duration_minutes',
	// { position, label, votes }[]
	'options',
	'voting_status',
]

const assembledUrl = [
	'https://api.twitter.com/2/tweets/search/recent',
	'?tweet.fields=',
	tweetFields.join(''),
	'&user.fields=',
	userFields.join(''),
	'&poll.fields=',
	pollFields.join(''),
	'&expansions=',
	expansions.join(''),
].join('')

const config = {
	twitter_bearer_token: 'Bearer <<INSERT YOUR BEARER TOKEN>>',
	gcp_projectId: '<<GCP PROJECT ID>>',
	PORT: 4050,
	recent_search_url: assembledUrl,
	bq: {
		table: {
			tweets: 'tweets',
			users: 'users',
		},
	},
}

export default config

// Unmodified recent_search_url (from https://github.com/twitterdev/gcloud-toolkit-recent-search):
// 'https://api.twitter.com/2/tweets/search/recent?tweet.fields=id,text,attachments,author_id,context_annotations,conversation_id,created_at,entities,geo,in_reply_to_user_id,lang,possibly_sensitive,public_metrics,referenced_tweets,reply_settings,source,withheld&expansions=author_id,referenced_tweets.id,in_reply_to_user_id,attachments.media_keys,attachments.poll_ids,geo.place_id,entities.mentions.username,referenced_tweets.id.author_id&media.fields=media_key,type,duration_ms,height,preview_image_url,public_metrics,width,alt_text&place.fields=contained_within,country,country_code,full_name,geo,id,name,place_type&poll.fields=duration_minutes,end_datetime,id,options,voting_status&user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld'
