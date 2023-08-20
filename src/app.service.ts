import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/user.dto';
import { CreateTweetDto } from './dtos/tweet.dto';
import { Tweet } from './entities/tweet.entity';

@Injectable()
export class AppService {
  getHello(): string {
    return "I'm okay!";
  }

  private users: User[] = []; 
  private tweets: Tweet[] = []; 

  createUser(body: CreateUserDto) {
    const user = new User(body.username, body.avatar);
    return this.users.push(user);
  }

  createTweet(body: CreateTweetDto) {
    const user = this.users.find((user) => user.username === body.username);
    if(!user){
      throw new UnauthorizedException();
    }
    const tweet = new Tweet(user, body.tweet);
    return this.tweets.push(tweet);
  }

  getTweetsByUsername(username: string){
    const userTweets = this.tweets.filter((tweet) => tweet.user.username === username);
    if(userTweets.length === 0){
      return [];
    }

    return userTweets.map((tweet) => {
      return {
        username: tweet.user.username,
        avatar: tweet.user.avatar,
        tweet: tweet.tweet
      };
    });
  }

  getTweets(page:number | null){
    if(page && page < 1){
      throw new BadRequestException('Informe uma página válida!', { cause: new Error(), description: 'Informe uma página válida!' });
    }

    const reversedTweets = this.tweets.reverse().map((tweet) => {
      return {
        username: tweet.user.username,
        avatar: tweet.user.avatar,
        tweet: tweet.tweet
      };
    });

    if(!page && reversedTweets.length <= 15){
      return reversedTweets;
    } 
    if (!page && reversedTweets.length > 15) {
      return reversedTweets.slice(0,15);
    } 
    if(page && page >= 1){
      const min = 15 * (page -1);
      const max = (15 * page) -1 ;
      const tweets = [];

      for (let i = min; i <= max && i < reversedTweets.length; i++) {
        tweets.push(reversedTweets[i]);
      }
      
      return tweets;
    }
  }
}
