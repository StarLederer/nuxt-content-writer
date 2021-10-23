# Dynamic page

This page showcases how you can use SelectableContent and DynamicPage to create, delete and edit pages completely inside the website GUI.

## SelectableContent component

SelectableContent is a wrapper around @nuxt/content's NuxtContent component. SelectableContent automatically includes a file selector and provides loader code for the content file. Thanks to the laoder code getting content to render is as easy as using this component and providing it with the dir storage-file and storage-key components. Dir is a path that points to the directory with content that can be selected in the file selecotor, storage-file is the path to the file selection is saved to and storage-key is a json key that points to where the selection is saved inside storage-file.

In production this component is just NuxtContent with loader code.

## DynamicPage component

This dynamic page is powered by the DynamicPage component. This component provides a visual way to create and delete content-based pages. DynamicPage accepts a page prop which is a string with a path that points to a .json file in the /content directory. That is the file that this component allows to visually create if it does not already exist, or delete if it does. While in this case the page slug is used as the path prop to allow creating pages any file name will work and this component will provide a wrapper for it with create/delete controls.

The functionalty of this component is only available in dev mode, in production this component is replaced with a passthrough div.

### Try creating and deleting dynamic pages

Unless you already changed it [page3](/dynamic/page3) does not exist. Visit the link and use GUI to create that page.

To delete a dynamic page, press teh button at the bottom of the window.