<script>
    import { browser } from "$app/environment";
    import Command from "./command.svelte";

    let commands = $state([
        { command: "FROM", args: ["ubuntu", ":", "latest"], currentlyEditing: true },
        { command: "RUN", args: ["apt-get update"] },
        { command: "RUN", args: ["apt-get install -y nginx"] }
    ]);

    let addingCommand = $state(false);
    let lastCurrentlyEditing = 0;
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
                });
            }

            if (addingCommand) {
                commands[lastCurrentlyEditing].currentlyEditing = true;
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
    <div class="editor">
        <p class="text-xl pb-2">Editor</p>
    </div>
</div>