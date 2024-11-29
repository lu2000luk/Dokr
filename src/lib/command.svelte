<script>
// @ts-nocheck

    let { command, args, currentlyEditing = false, deleteFunction = () => {}, argBuilder = () => {}, setCurrentEditing = () => {} } = $props();
    import { Trash2 } from 'lucide-svelte';
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="flex p-2 my-2 rounded bg-[#0f1013] overflow-x-auto justify-between items-center" style="{currentlyEditing ? "border: 2px solid #10b981;" : ""}" onclick={setCurrentEditing}>
    <div class="flex">    
        <span class="text-[#7e22ce] cursor-pointer hover:bg-text hover:bg-opacity-80 hover:text-background p-1 mr-1 rounded command_section command_command">{command}</span>
        <span class="text-[#0284c7] cursor-pointer hover:bg-text hover:bg-opacity-80 hover:text-background p-1 rounded command_section command_argument">{argBuilder(args)}</span>
    </div>
    <div class="side flex items-center">
        <Trash2 class="cursor-pointer hover:text-[#ff0000] text-[#6d6d6d] scale-90 transition-all duration-200" onclick={deleteFunction} />
    </div>
</div>