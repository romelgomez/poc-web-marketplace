# @nx setting in a existing project a mono repo


NextJS

nx add @nx/next 
nx g @nx/next:app apps/web
nx dev web


NestJS

nx add @nx/nest  
nx g @nx/nest:app apps/api  
nx serve api
 

❌ > nx run web:build
❌ > nx run web:lint
❌ > nx run web:test

❌ > nx run api:build
❌ > nx run api:lint
❌ > nx run api:test
