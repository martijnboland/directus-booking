import { ref, computed, watch, Ref } from 'vue';

export default function useFolder(items: Ref<Record<string, any>[]>, filesPropertyName: string, initialFolder?: string) {
  const folder = ref(initialFolder);
  const setFolder = (value: string) => {
    console.log('folder => ', value);
    folder.value = value;
  }
  const folderFilter = computed(() => {
    const filter = folder.value ? { folder: folder.value } : undefined;
    console.log('filter => ', filter);
    return filter;
  });

  watch(items, (newItems) => {
    if (newItems.length > 0 && newItems[0]) {
      // Set folder to the folder of the first item in the list
      setFolder(newItems[0][filesPropertyName].folder);
    }
  });

  return {
    folder, setFolder, folderFilter
  }
}
