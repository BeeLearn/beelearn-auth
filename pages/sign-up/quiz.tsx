import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";

import type { Gender } from "~/data/genders";

import GoalTab from "~/components/quizTabs/GoalTab.vue";
import NameTab, { type Name } from "~/components/quizTabs/NameTab.vue";
import GenderTab from "~/components/quizTabs/GenderTab.vue";
import UsernameTab from "~/components/quizTabs/UsernameTab.vue";
import InterestTab from "~/components/quizTabs/InterestTab.vue";
import type { Goal } from "~/data/goals";

const selectedIndex = ref(0);

const onNextPage = function () {
  selectedIndex.value += 1;
}

const goal = ref<Goal | null>();
const name = ref<Partial<Name>>({});
const username = ref<string | null>(null);
const interests = ref<any[]>([]);
const gender = ref<Gender | null>(null);

const onSubmit = function () { 
  const payload = {
    first_name: name.value.firstName!,
    last_name: name.value.lastName!,
    profile: {

    },
    categories: {
      add: [],
    },
    gender: gender.value!.name.toUpperCase(),
  };

  console.log(payload)
}

export default function QuizPage() {
  const tabs = computed(() => [
    <GenderTab
      value={gender.value}
      onSubmit={onNextPage}
      onUpdate:value={value => gender.value = value} />,
    <InterestTab
      value={interests.value}
      onSubmit={onNextPage}
      onUpdate:value={value => interests.value = value} />,
    <GoalTab
      value={goal.value}
      onSubmit={onNextPage}
      onUpdate:value={value => goal.value = value} />,
    <UsernameTab
      value={username.value}
      onSubmit={onNextPage}
      onUpdate:value={value => username.value = value} />,
    <NameTab
      value={name.value}
      onSubmit={onSubmit}
      onUpdate:value={value => {
        name.value.firstName = value.firstName ?? name.value.firstName;
        name.value.lastName = value.lastName ?? name.value.lastName;
      }} />,
  ]);

  return (
    <>
      <TabGroup
        key={selectedIndex.value}
        as="div"
        class="w-full flex-1 flex flex-col md:w-1/2 lg:w-1/3"
        selectedIndex={selectedIndex.value}
        onChange={index => selectedIndex.value = index}>
        <TabList
          as="div"
          class="flex items-center p-4">
          {
            tabs.value.map((tab, index) => (
              <>
                <Tab
                  as="div"
                  disabled={index > selectedIndex.value}>
                  <UnoIcon
                    class={
                      index === selectedIndex.value ?
                        'i-mdi:circle text-violet-700 text-lg' :
                        index <= selectedIndex.value ?
                          'i-mdi:check-circle text-violet-700 text-lg' :
                          'i-mdi:circle text-slate-400 text-lg'
                    } />
                </Tab>
                {
                  index < tabs.value.length - 1 &&
                  <div class="flex-1 bg-slate-300">
                    <div class="w-1/10  p-0.3 transition-width duration-500" />
                  </div>
                }
              </>
            ))
          }
        </TabList>
        <TabPanels as="template">
          {
            tabs.value.map((tab, index) => (
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
}
