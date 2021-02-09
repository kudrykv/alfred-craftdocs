# Craft Docs Workflow
Note search for [Craft Docs](https://www.craft.do) using [Alfred](https://www.alfredapp.com).

## Prerequisites
You need Node to be installed and `node` and `npm` to be available in one of these places:
* `/usr/local/bin`;
* `/usr/bin`;
* `/usr/sbin`;
* `/bin`;
* `/sbin`.

GUI applications do not inherit `$PATH`, and the workflow searches though these dirs for the required binaries. 


## Install
[Download](https://github.com/kudrykv/alfred-craftdocs/releases/download/v0.2.0/Craft_Docs_v0.2.0.alfredworkflow)
the latest release and double-click it.
Alfred will proceed with installation.

Using Alfred, run `cdinit` command to set up the workflow.
This will download dependencies workflow requires (about 270 MB).


# Usage
At the first run, execute `cdinit` to initialize the workflow.

## Search
Run `cs <query>` to search for documents.

![](example-cs.png)

## Create a daily note
Run `cdo` and select "today" to create daily note.

![](example-cdo-today.png)

You weill need to configure the default folder for storing these notes though.
To do that, run `cdconf`.

To configure the pattern for today's note, open the workflow variables in the Alfred.

![](example-edit-wf_var.png)

## Configuration
Run `cdconf` to configure some workflow values.

![](example-cdconf.png)

Select the folder where all your new notes will be created.

![](example-cdconf-default-folder.png)
