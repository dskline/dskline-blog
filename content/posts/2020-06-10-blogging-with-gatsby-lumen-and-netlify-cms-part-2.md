---
template: post
title: Blogging with Gatsby, Lumen, and Netlify CMS (Part 2)
slug: project-gatsby-blog-part-2
draft: false
date: 2020-06-10T21:15:56.346Z
description: How to setup your own Gatsby blog in a few hours with gatsby-starter-lumen
category: Project
tags:
  - Web Development
  - Project
---
* [Prerequisites](#prerequisites)
* [Gatsby Configuration](#gatsby-configuration)
* [Configuring Netlify](#configuring-netlify)
* [Enabling Draft Posts](#enabling-draft-posts)

I'm writing this post because other setup guides I tried had some issues. Maybe the auto-install "Deploy to Netlify" button (and other similar workflows) changed at some point. In any case, I hope this guide finds anyone who gets stuck somewhere in the process, because the end result is a truly amazing blogging experience. In a few hours, you can have a blog that:

1. Is statically generated and can be maintained without cost on many hosting services
2. Is simple, yet elegant, right out of the box with little need for development expertise or time spent tweaking styles
3. Can create content and posts with markdown or through an admin GUI
4. Automatically generates an RSS feed
5. Requires one-line changes in most cases to add comment support, social networking links, google analytics, and more
6. Has full PWA (with offline) support - Lighthouse scores green in every category even with many of the "extra" plugins enabled

If you haven't read part one, I wrote about why I think now is one of the best times for developers to get started with blogging. All convinced? Let's get started!

# Prerequisite

1. Install Git

2. Install NPM and Gatsby

   * `npm install -g gatsby`
3. Import the gatsby-starter-lumen starter template into a local directory

   * `gatsby new my-gatsby-blog 
     https://github.com/alxshelepenok/gatsby-starter-lumen`
4. Remove the .git directory from the newly created project, and then start a new git instance

   * `cd my-gatsby-blog && git init`
   * Add all the files and push to your own git repository (see an in-depth guide [here](https://kbroman.org/github_tutorial/pages/init.html))

Now the project is under your control! Next up - configuration:

# Gatsby Configuration

Listed here are some of the config files I recommend taking a look at and modifying to your needs:

```
./
   /* this folder acts as your "CMS" - more on this later */
   content
      pages
      posts

   static
      admin
         /* update this file when you're ready to turn on draft editing */
         config.yml

      /* upload your own photo here */
      photo.jpg

   /* site name, metadata, contact info, disqus, analytics, etc. */
   config.js

   /* update your project metadata here */
   package.json
```

There are many other plugin settings, but these are the files that developers will need to modify to make the project their own. Once you're happy with your changes, we can spin up a server with this command to test it:

`npm run develop`

The webpage can then be viewed at http://localhost:8000. If everything looks good, you can modify some of the markdown files in the `./content` folder and Gatsby will regenerate the static HTML and "hot-refresh" the page in your browser.

Once you're happy with your new site, push it to the master branch and we'll get started deploying it to the web.

# Configuring Netlify

Login or sign up for a free Netlify account [here](https://www.netlify.com/). Go through the steps to link your GitHub account containing your Gatsby project and deploy it. Once started, the website should be deployed in less than a minute (I know, madness). While that's happening, we need to turn on some settings anyway.

## Turn on Identity to enable the CMS admin page

While on your Netlify site dashboard, go to the Settings tab in the navbar. Click on Identity from the sidebar, and click on the button to enable Identity.

Next, go down a bit to `Identity > Services` and turn on `Git Gateway`. This will allow the Netlify CMS to push content changes to your git repo (which will then chain a new deployment).

Once Identity is enabled, you should also see the Identity tab in the top navbar. Go there and invite yourself using your own email address. If your site has already deployed, you can verify your email and immediately visit your admin console at `your-netlify-domain.com/admin`. Here, you can create a password and start modifying your pages and posts!

# Enabling Draft Posts

You might notice that when you create a new post in the admin page, there's no option to save the post as a draft and publish it later. 

This is because we need to setup a staging branch in our git project. By default, all posts in the content folder on the `master` branch are made public (unless the draft flag is set in the markdown file frontmatter).

```
File: ./static/admin/config.yaml

# Uncomment to leverage Netlify CMS UI authoring flow
# see: https://www.netlifycms.org/docs/configuration-options/#publish-mode
# publish_mode: editorial_workflow
```

Uncomment the last line to set the publish_mode option and then push your configuration change to master. Then sit back and be amazed as everything just configures itself.

## What happens now?

When creating or editing posts, you should now see a Save button on the edit page. Clicking this button will create a new branch and kick off a Netlify deployment.

Important: Make sure before you Save your post that the "Draft" toggle switch is turned off to view it on the preview server.

When the deployment is finished, a "View Preview" link should be displayed in the top of the post edit screen. Now, you can test what your post will look like in production before publishing. You can even checkout the newly created branch to your local machine and play around with different style configurations if you like.

# Conclusion

I hope this post helps more developers get started making their own blogs. If you've discovered any other cool tricks with this workflow, leave me a comment below.