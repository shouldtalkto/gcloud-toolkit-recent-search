const config = {
	twitter_bearer_token: 'Bearer <<INSERT YOUR BEARER TOKEN>>',
	gcp_projectId: '<<GCP PROJECT ID>>',
	PORT: 4050,
	recent_search_url:
		'https://api.twitter.com/2/tweets/search/recent?tweet.fields=id,text,author_id,context_annotations,conversation_id,created_at,entities,in_reply_to_user_id,lang,possibly_sensitive,public_metrics,referenced_tweets,reply_settings,source,withheld&expansions=author_id,referenced_tweets.id,in_reply_to_user_id,attachments.poll_ids,entities.mentions.username,referenced_tweets.id.author_id&poll.fields=duration_minutes,end_datetime,id,options,voting_status&user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld',
	bq: {
		table: {
			tweets: 'tweets',
			users: 'users',
			media: 'media',
		},
	},
}

export default config
