<script>
    let { command, args, currentlyEditing = false } = $props();
</script>

<div class="flex p-2 my-2 rounded bg-[#0f1013] overflow-x-auto" style="{currentlyEditing ? "border: 2px solid #10b981;" : ""}">
    <span class="text-[#7e22ce] cursor-pointer hover:bg-text hover:bg-opacity-80 hover:text-background p-1 mr-1 rounded command_section command_command">{command}</span>
    {#each args as arg}
        {#if arg === ":" || arg === "="}
            <span class="text-[#14b8a6] cursor-pointer py-1">{arg}</span>
        {:else}
            <span class="text-[#0284c7] cursor-pointer hover:bg-text hover:bg-opacity-80 hover:text-background p-1 rounded command_section command_argument">{arg}</span>
        {/if}
    {/each}
</div>