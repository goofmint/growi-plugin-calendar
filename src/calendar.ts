import { getPackedSettings } from 'http2';

import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import VanillaCalendar from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

interface GrowiNode extends Node {
  name: string;
  type: string;
  attributes: {[key: string]: string}
  children: GrowiNode[];
  value: string;
}

export const plugin: Plugin = function() {
  return (tree) => {
    visit(tree, (node) => {
      const n = node as unknown as GrowiNode;
      try {
        if (n.type === 'leafGrowiPluginDirective' && n.name === 'calendar') {
          const [month, year] = Object.keys(n.attributes);
          const lang = n.attributes.lang || 'en';
          const separator = n.attributes.separator || '/';
          n.type = 'html';
          n.value = '<div id="calendar"></div>';
          console.log(month, year, lang);
          let clicked = false;
          const id = setInterval(() => {
            if (document.querySelector('#calendar') != null) {
              const cal = new VanillaCalendar('#calendar', {
                settings: {
                  lang,
                  selected: {
                    month: isNaN(month as unknown as number) ? new Date().getMonth() : parseInt(month) - 1,
                    year: isNaN(year as unknown as number) ? new Date().getFullYear() : parseInt(year),
                  },
                },
                actions: {
                  async clickDay(event, self) {
                    if (clicked) return;
                    clicked = true;
                    const page = self.selectedDates[0].replaceAll(/-/g, separator);
                    const path = await getPagePath();
                    location.href = `${path}${page}`;
                  },
                },
              });
              cal.init();
              clearInterval(id);
            }
          }, 100);
        }
      }
      catch (e) {
        n.type = 'html';
        n.value = `<div style="color: red;">Error: ${(e as Error).message}</div>`;
      }
    });

    const getPagePath = async() => {
      if (location.pathname === '/') return '/';
      const pageId = location.pathname.replace(/\//, '');
      const res = await fetch(`/_api/v3/page?pageId=${pageId}`);
      const json = await res.json();
      const { path } = json.page;
      return `${path}/`;
    };
  };
};
