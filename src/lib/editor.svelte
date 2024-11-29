<script>
    // @ts-nocheck
    import { browser } from "$app/environment";
    import Command from "./command.svelte";

    let available = [
        {
            command: "FROM",
            args: [
                { name: "image", type: "text", example: "ubuntu" },
                { name: "tag", type: "text", example: "latest" }
            ],
            argBuilder: (args) => {
                return args.join(":");
            },
            description: "Sets the base image for the Dockerfile",
            example: "FROM ubuntu:latest",
            onlyOnce: true
        },
        {
            command: "RUN",
            args: [{ name: "command", type: "text", example: "apt-get update" }],
            argBuilder: (args) => args.join(""),
            description: "Executes a command in the build process",
            example: "RUN apt-get update"
        },
        {
            command: "CMD",
            args: [{ name: "command", type: "text", example: "nginx -g 'daemon off;'" }],
            argBuilder: (args) => args.join(""),
            description: "The default command to run when the container starts",
            example: "CMD nginx -g 'daemon off;'",
            onlyOnce: true
        },
        {
            command: "EXPOSE",
            args: [{ name: "port", type: "number", example: "80" }],
            argBuilder: (args) => args.join(""),
            description: "Exposes a port from the container to the host",
            example: "EXPOSE 80"
        },
        {
            command: "ENV",
            args: [
                { name: "key", type: "text", example: "PATH" },
                { name: "value", type: "text", example: "/usr/local/bin" }
            ],
            argBuilder: (args) => args.join("="),
            description: "Sets environment variables",
            example: "ENV PATH=/usr/local/bin"
        },
        {
            command: "COPY",
            args: [
                { name: "src", type: "text", example: "." },
                { name: "dest", type: "text", example: "/app" }
            ],
            argBuilder: (args) => args.join(" "),
            description: "Copies files from source to destination",
            example: "COPY . /app"
        },
        {
            command: "WORKDIR",
            args: [{ name: "path", type: "text", example: "/app" }],
            argBuilder: (args) => args.join(""),
            description: "Sets working directory for subsequent commands",
            example: "WORKDIR /app"
        },
        {
            command: "VOLUME",
            args: [{ name: "path", type: "text", example: "/var/log" }],
            argBuilder: (args) => args.join(""),
            description: "Creates a mount point with the specified name",
            example: "VOLUME /var/log"
        },
        {
            command: "USER",
            args: [{ name: "user", type: "text", example: "root" }],
            argBuilder: (args) => args.join(""),
            description: "Sets the user for the subsequent commands",
            example: "USER root"
        },
        {
            command: "LABEL",
            args: [
                { name: "key", type: "text", example: "version" },
                { name: "value", type: "text", example: "1.0" }
            ],
            argBuilder: (args) => args.join("="),
            description: "Adds metadata to an image",
            example: "LABEL version=1.0"
        },
        {
            command: "ARG",
            args: [
                { name: "name", type: "text", example: "BUILD_VERSION" },
                { name: "default", type: "text", example: "latest" }
            ],
            argBuilder: (args) => args.join("="),
            description: "Defines a variable to pass to the build process",
            example: "ARG BUILD_VERSION=latest"
        },
        {
            command: "ONBUILD",
            args: [{ name: "instruction", type: "text", example: "ADD . /app" }],
            argBuilder: (args) => args.join(""),
            description: "Adds a trigger instruction",
            example: "ONBUILD ADD . /app"
        },
        {
            command: "STOPSIGNAL",
            args: [{ name: "signal", type: "text", example: "SIGTERM" }],
            argBuilder: (args) => args.join(""),
            description: "Sets the system call signal that will stop the container",
            example: "STOPSIGNAL SIGTERM"
        },
        {
            command: "HEALTHCHECK",
            args: [{ name: "command", type: "text", example: "curl localhost" }],
            argBuilder: (args) => args.join(""),
            description: "Sets a command to run to check the container's health",
            example: "HEALTHCHECK curl localhost"
        },
        {
            command: "SHELL",
            args: [{ name: "shell", type: "text", example: "/bin/bash" }],
            argBuilder: (args) => args.join(""),
            description: "Sets the default shell for the container",
            example: "SHELL /bin/bash"
        },
        {
            command: "MAINTAINER",
            args: [{ name: "name", type: "text", example: "John Doe" }],
            argBuilder: (args) => args.join(""),
            description: "Sets the author of the image",
            example: "MAINTAINER John Doe"
        },
        {
            command: "ADD",
            args: [
                { name: "src", type: "text", example: "." },
                { name: "dest", type: "text", example: "/app" }
            ],
            argBuilder: (args) => args.join(" "),
            description: "Copies files from source to destination",
            example: "ADD . /app"
        }
    ];

    import { TextCursor, Brackets, Binary } from 'lucide-svelte';

    let argIcon = {
        "text": TextCursor,
        "array": Brackets,
        "number": Binary
    };

    let commands = $state([
        { command: "FROM", args: ["ubuntu", ":", "latest"], currentlyEditing: true },
        { command: "RUN", args: ["apt-get update"] },
        { command: "RUN", args: ["apt-get install -y nginx"] }
    ]);

    let addingCommand = $state(false);
    let lastCurrentlyEditing = 0;

    let editorText = $state("Editor");
</script>

<div class="wrapper w-full p-10 rounded-lg border-2 border-primary flex gap-5">
    <div class="commands w-3/5">
        <p class="text-xl pb-2">Commands</p>
        
        {#each commands as { command, args, currentlyEditing }, i}
            <Command {command} {args} {currentlyEditing} />
        {/each}

        <div class="separator-line bg-[#0f1013] flex rounded pt-1 mx-5 my-3"></div>

        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="newCommand flex p-2 my-2 rounded bg-[#0f1013] cursor-pointer select-none hover:bg-text hover:text-background transition-all justify-center"  onclick={() => {
            if (commands[commands.length - 1].command === "CMD") {
                alert("The CMD command is the last command in a Dockerfile. You can't add more commands after it.");
                return;
            }

            if (!addingCommand) {
                commands.forEach(command => {
                    if (command.currentlyEditing) {
                        lastCurrentlyEditing = commands.indexOf(command);
                        command.currentlyEditing = false;
                    }

                    editorText = "Adding command";
                });
            }

            if (addingCommand) {
                commands[lastCurrentlyEditing].currentlyEditing = true;
                editorText = "Editor";
            }

            addingCommand = !addingCommand;
        }}>
            <span class="p-1">{addingCommand ? "» Adding command" : "+ New Command"}</span>
        </div>

        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="exportCommand flex p-2 my-2 rounded bg-[#0f1013] cursor-pointer select-none hover:bg-text hover:text-background transition-all justify-center"  onclick={() => {
            let commandString = "# Generated with Dokr\n\n";
            
            commandString += commands.map(({ command, args }) => {
                return `${command} ${args.join("")}`;
            }).join("\n");


            let blob = new Blob([commandString], { type: "application/octet-stream" });
            let url = URL.createObjectURL(blob);
            let a = document.createElement("a");
            a.href = url;
            a.download = "Dockerfile";
            a.click();
            URL.revokeObjectURL(url);

            console.log(commandString);
            console.log(commands);
        }}>
            <span class="p-1">░ Export Dockerfile</span>
        </div>
    </div>
    <div class="editor flex flex-col flex-grow">
        <p class="text-xl pb-2">{editorText}</p>
        {#if addingCommand}
            <div class="flex flex-col gap-2 flex-grow overflow-y-auto max-h-96 p-2 rounded-lg border-2 border-primary">
                {#each available as command}
                    <div class="availableCommand w-full rounded p-4 bg-[#0f1013] flex gap-5 cursor-pointer">
                        <div class="squareCommand w-24 h-24 flex justify-center items-center rounded bg-background hover:bg-[#31343d] select-none">
                            {command.command}
                        </div>

                        <div class="commandMeta flex flex-col">
                            <p class="text-lg">{command.description}</p>
                            <div class="flex gap-1 items-center text-sm">Example: <p class="text-[#14b8a6] py-1 px-2 bg-background rounded">{command.example}</p></div>
                            <div class="argsTags flex gap-2 mt-2">
                                {#each command.args as arg}
                                    <div class="argTag flex text-text rounded-full py-1 px-2 bg-[#31343d] items-center text-sm gap-1" title="{arg.name[0].toUpperCase() + arg.name.slice(1)} argument">
                                        <!-- svelte-ignore svelte_component_deprecated -->
                                        <svelte:component this={argIcon[arg.type]} class="w-4 h-4"/>
                                        <p>{arg.name[0].toUpperCase() + arg.name.slice(1)}</p>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        {:else}{/if}
    </div>
</div>