import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";

import type { Goal } from "~/data/goals";
import type { Gender } from "~/data/genders";

import type { Category } from "~/lib/api/models/category.model";

import Icon from "./Icon.vue";
import GoalTab from "./quizTabs/GoalTab.vue";
import GenderTab from "./quizTabs/GenderTab.vue";
import UsernameTab from "./quizTabs/UsernameTab.vue";
import InterestTab from "./quizTabs/InterestTab.vue";
import NameTab, { type Name } from "./quizTabs/NameTab.vue";

const selectedIndex = ref(0);
const onNextPage = () => selectedIndex.value += 1;

export default defineComponent({
  props: {
    name: Object as PropType<Name | null>,
    goal: Object as PropType<Goal | null>,
    interests: Array as PropType<Category[]>,
    gender: Object as PropType<Gender | null>,
    username: String as PropType<string | null>,
  },
  emits: ['update:name', 'update:goal', 'update:interests', 'update:gender', 'update:username', 'submit'],
  setup(props, { emit }) {

    const tabs = computed(() => [
      <GenderTab
        value={props.gender!}
        onSubmit={onNextPage}
        onUpdate:value={value => emit('update:gender', value)} />,
      <InterestTab
        value={props.interests!}
        onSubmit={onNextPage}
        onUpdate:value={value => emit('update:interests', value)} />,
      <GoalTab
        value={props.goal!}
        onSubmit={onNextPage}
        onUpdate:value={value => emit('update:goal', value)} />,
      <UsernameTab
        value={props.username!}
        onSubmit={onNextPage}
        onUpdate:value={value => emit('update:username', value)} />,
      <NameTab
        value={props.name!}
        onSubmit={() => emit('submit')}
        onUpdate:value={value => {
          const newValue = {
            lastName: value.lastName ?? props.name!.lastName,
            firstName: value.firstName ?? props.name!.firstName
          };

          emit('update:name', newValue);
        }} />,
    ]);


    return { tabs };
  },
  render() {
    return (
      <>
        <TabGroup
          key={selectedIndex.value}
          as="div"
          class="w-full flex-1 flex flex-col md:w-1/2 lg:w-1/3 overflow-y-scroll"
          selectedIndex={selectedIndex.value}
          onChange={index => selectedIndex.value = index}>
          <TabList
            as="div"
            class="flex items-center p-4">
            {
              this.tabs.map((tab, index) => (
                <>
                  <Tab
                    as="div"
                    disabled={index > selectedIndex.value}
                    class={index > selectedIndex.value ? "" : "cursor-pointer"}>
                    <Icon
                      class={
                        index === selectedIndex.value ?
                          'i-mdi:circle text-violet-700 text-lg' :
                          index <= selectedIndex.value ?
                            'i-mdi:check-circle text-violet-700 text-lg' :
                            'i-mdi:circle text-stone-200 text-lg'
                      } />
                  </Tab>
                  {
                    index < this.tabs.length - 1 &&
                    <div class="flex-1 bg-stone-200">
                      <div class="w-1/10  p-0.3 transition-width duration-500" />
                    </div>
                  }
                </>
              ))
            }
          </TabList>
          <TabPanels as="template">
            {
              this.tabs.map((tab, index) => (
                <TabPanel
                  key={index}
                  as="template">
                  {tab}
                </TabPanel>
              ))
            }
          </TabPanels>
        </TabGroup>
      </>
    );
  },
});
