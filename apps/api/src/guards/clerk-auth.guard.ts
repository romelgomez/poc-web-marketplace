// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import clerkClient from '@clerk/clerk-sdk-node';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      console.log('request.headers', request.headers);

      // Extract the Clerk JWT from the Authorization header
      const token = request.headers.authorization?.split(' ')[1];

      console.log('token', token);

      // Verify the token with Clerk's servers
      await clerkClient.verifyToken(token, {});
      return true;
    } catch (error) {
      return false;
    }
  }
}
