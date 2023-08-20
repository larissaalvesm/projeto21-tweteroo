import { Injectable, UnauthorizedException } from '@nestjs/common';
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
}
