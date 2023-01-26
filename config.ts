// stt * = data represented in stt data models
// _fields = unused but returned in response
// everything else: potentially useful data recorded for analytics purposes; not necessary to stt app funcionality
// todo: add edited to schema, check fields for tweet and user schemas

const splitUrl = [
	// Fields | stt Tweet.id
	'https://api.twitter.com/2/tweets/search/recent?tweet.fields=id',
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
	// name of app tweeted from, for analytics | Expansions | author's user object
	'source&expansions=author_id',
	// user object of author of tweet being replied to (for user referenced in reply-tweet)
	'in_reply_to_user_id',
	// poll object; poll data to be modeled and parsed when poll detection is implemented
	'attachments.poll_ids',
	// mentioned user objects | Poll Fields | poll data/
	'entities.mentions.username&poll.fields=id',
	'end_datetime',
	'duration_minutes',
	'options',
	// /poll data | User Fields | stt User.id
	'voting_status&user.fields=id',
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
